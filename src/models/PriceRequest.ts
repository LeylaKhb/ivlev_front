export class PriceRequest {
    departureCity: string;
    store: string;
    sendCity: string;
    volume: number;

    constructor(departureCity: string, store: string, sendCity: string, volume: number) {
        this.departureCity = departureCity;
        this.store = store;
        this.sendCity = sendCity;
        this.volume = volume;
    }
}