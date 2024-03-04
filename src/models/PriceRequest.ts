export class PriceRequest {
    departureCity: string;
    store: string;
    sendCity: string;
    volume: number;
    willTaken: boolean;
    pallet: boolean;
    amount: number;


    constructor(departureCity: string, store: string, sendCity: string, volume: number, willTaken: boolean, 
                pallet: boolean, amount: number) {
        this.departureCity = departureCity;
        this.store = store;
        this.sendCity = sendCity;
        this.volume = volume;
        this.willTaken = willTaken;
        this.pallet = pallet;
        this.amount = amount;
    }
}