export class AnswerRequest {
    name: string | null;
    phoneNumber: string | null;
    store?: string | null;
    service?: string | null;
    firstTime?: string | null;
    item?: string | null;
    connect?: string | null;


    constructor(name: string | null, phoneNumber: string | null, store?: string | null, service?: string | null,
                firstTime?: string | null, item?: string | null, connect?: string | null) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.store = store;
        this.service = service;
        this.firstTime = firstTime;
        this.item = item;
        this.connect = connect;
    }
}