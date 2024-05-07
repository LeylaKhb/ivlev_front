import React from "react";
import DialogModel from "../models/DialogModel";
import SockJS from 'sockjs-client'
import Stomp, {Message} from 'stompjs'

interface ChatProps {
}

interface ChatState {
    messageText: string,
    webSocket: Stomp.Client | null,
    dialog: DialogModel | null
}

class Chat extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);

        this.state = {
            messageText: "",
            webSocket: null,
            dialog: null
        }
    }

    componentDidMount() {
        let me = this;

        fetch("https://kodrfb.ru/dialog", {
            method: "GET",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("jwt"),
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    console.log(data)
                    me.setState({dialog: data})
                    let socket = new SockJS("https://kodrfb.ru/ws");
                    let stompClient = Stomp.over(socket);
                    stompClient.connect({}, function () {
                        stompClient.subscribe("/chat/dialog/" + data.id + "/" + localStorage.getItem("jwt"), function (message: Message) {
                            me.updateChat(message.body)
                        })
                    });
                })
        })
    }

    updateChat(msg: string) {
        if (document.getElementById("chat") == null) return;
        if (document.getElementById("chat") != null) {
            // @ts-ignore
            document.getElementById("chat").insertAdjacentHTML("afterbegin", "<p>" + msg + "</p>");
        }
    }
    onMessageInput(e: React.ChangeEvent<HTMLInputElement>) {
        let me = this;
        me.setState({messageText: e.target.value})
    }

    private sendMessage() {
        if (this.state.messageText !== "") {
            this.state.webSocket?.send("/app/dialog/" + this.state.dialog?.id + "/" + localStorage.getItem("jwt"), {}, this.state.messageText)
            this.setState({messageText: ""})
        }
    }

    render() {
        return (
            <div>
                <input id="message" placeholder="Type your message" onInput={this.onMessageInput}
                       value={this.state.messageText}/>
                <button id="send" onClick={this.sendMessage}>Send</button>
                <div id="chat">
                    {/*{this.state.dialog?.messages}*/}
                    {this.state.dialog?.messages.map((message) => (
                        <div>[{message.firstName}]: {message.textContext}</div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Chat;