export class PriceRequest {
    departureCity: string;
    store: string;
    sendCity: string;
    volume: number;
    willTaken: boolean;
    isPallet: boolean;
    amount: number;


    constructor(departureCity: string, store: string, sendCity: string, volume: number, willTaken: boolean, isPallet: boolean, amount: number) {
        this.departureCity = departureCity;
        this.store = store;
        this.sendCity = sendCity;
        this.volume = volume;
        this.willTaken = willTaken;
        this.isPallet = isPallet;
        this.amount = amount;
    }
}