class MessageDto {
    id?: String
    textContext: String


    constructor(textContext: String, id?: String) {
        this.id = id;
        this.textContext = textContext;
    }
}

export default MessageDto;