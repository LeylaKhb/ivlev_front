import User from "./User";

class Message {
    textContext: String
    firstName: string

    constructor(textContext: String, firstName: string) {
        this.textContext = textContext;
        this.firstName = firstName;
    }
}

export default Message;