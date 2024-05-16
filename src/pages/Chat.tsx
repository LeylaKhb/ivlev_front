import React from "react";
import DialogModel from "../models/DialogModel";
import SockJS from 'sockjs-client'
import Stomp, {Message} from 'stompjs'
import MessageModel from "../models/Message";

interface ChatProps {
    dialogId?: string | undefined
}

interface ChatState {
    messageText: string,
    webSocket: Stomp.Client | null,
    dialog: DialogModel | null,
    messageUpdated: boolean,
    wsConnected: boolean
}

class Chat extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);

        this.state = {
            messageText: "",
            webSocket: null,
            dialog: null,
            messageUpdated: true,
            wsConnected: false
        }

        this.updateChat = this.updateChat.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onMessageInput = this.onMessageInput.bind(this);
        // this.updateChat = this.updateChat.bind(this);

    }

    componentDidMount() {
        let me = this;
        let url = this.props.dialogId === undefined ? "https://kodrfb.ru/dialog" :
            "https://kodrfb.ru/dialog/" + this.props.dialogId

        fetch(url, {
            method: "GET",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("jwt"),
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    me.setState({dialog: data})
                    let socket = new SockJS("https://kodrfb.ru/ws");
                    let stompClient = Stomp.over(socket);
                    stompClient.connect({}, function () {
                        me.setState({wsConnected: true})
                        stompClient.subscribe("/chat/dialog/"+ data.id.toString(),
                            function (message: Message) {
                            me.updateChat(message.body)
                        })
                    });
                    me.setState({webSocket: stompClient})
                })
        })
    }

    updateChat(msg: string) {
        if (this.state.dialog !== null && !this.state.messageUpdated) {
            let messages = this.state.dialog.messages
            messages.push(new MessageModel(msg.split("~%&")[1], msg.split("~%&")[0]))
            let newDialog = new DialogModel(this.state.dialog.id,
                messages)
            this.setState({dialog: newDialog, messageUpdated: true})
        }
    }
    onMessageInput(e: React.ChangeEvent<HTMLInputElement>) {
        let me = this;
        me.setState({messageText: e.target.value})
    }

    private sendMessage() {
        if (this.state.messageText !== "") {
            this.state.webSocket?.send("/app/dialog/"+localStorage.getItem("jwt") + "/" + this.state.dialog?.id.toString(),
                {}, this.state.messageText)
            this.setState({messageText: "", messageUpdated: false})
        }
    }

    render() {
        return (
            <div className="page_content">
                <div style={{marginTop: 100}}>
                    <input id="message" placeholder="Type your message" onInput={this.onMessageInput}
                           value={this.state.messageText}/>
                    <button id="send" onClick={this.sendMessage}
                    disabled={!this.state.wsConnected}>
                        {this.state.wsConnected ? "Send" : "..."}</button>
                    <div id="chat">
                        {/*{this.state.dialog?.messages}*/}
                        {this.state.dialog?.messages.map((message, index) => (
                            <div key={index}>[{message.firstName}]: {message.textContext}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;