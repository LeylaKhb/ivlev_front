import {UUID} from "crypto";
import Message from "./Message";

class DialogModel {
    id: UUID
    messages: Array<Message>


    constructor(id: UUID, messages: Array<Message>) {
        this.id = id;
        this.messages = messages;
    }
}

export default DialogModel;

// export default DialogModel;