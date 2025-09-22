import React from "react";
import DialogModel from "../models/DialogModel";

interface AllDialogsProps {
}

interface AllDialogsState {
    dialogs: DialogModel[]
}

class AllDialogs extends React.Component<AllDialogsProps, AllDialogsState>  {
    constructor(props: AllDialogsProps) {
        super(props);
        this.state = {
            dialogs: []
        }
    }
    componentDidMount() {
        fetch("https://kodrf.ru/all_dialogs",{
            method: "GET"
        }).then(resp =>
            resp.json()
                .then(data => {
                    this.setState({dialogs: data})})
        )
    }

    render() {
        function lastMessage(dialog: DialogModel) {
            const messages = dialog.messages
            if (messages.length === 0)
                return "No messages"
            return `[${messages.at(messages.length - 1)?.firstName}]: ${messages.at(messages.length - 1)?.textContext} `
        }

        return (
            <div className="page_content">
                <div style={{marginTop: 100}}>
                    {this.state.dialogs.map((dialog, index) => (
                        <div key={index}>
                            <div style={{marginBottom: 20}} >
                                <a href={"/dialog/" + dialog.id}>{dialog.id}</a>
                            <br/>
                            {lastMessage(dialog)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default AllDialogs;