import {Box} from "./Box";

export class Orders {
    entity: string;
    departureDate: Date;
    phoneNumber: string;
    sendCity: string;
    departureCity: string;
    store: string;
    supplyType: string;
    volume: number;
    price: string;
    willTaken: boolean;
    comment: string;
    numberOzon: string;
    supplyTitle: string;
    boxes?: Box[];
    orderDate?: Date;
    status?: string;
    changeable?: boolean;
    id?: number;


    constructor(entity: string, departureDate: Date, phoneNumber: string, sendCity: string, departureCity: string, store: string, supplyType: string, volume: number, price: string, willTaken: boolean, comment: string, numberOzon: string, supplyTitle: string, id?: number, orderDate?: Date, status?: string, changeable?: boolean,  boxes?: Box[]) {
        this.entity = entity;
        this.departureDate = departureDate;
        this.phoneNumber = phoneNumber;
        this.sendCity = sendCity;
        this.departureCity = departureCity;
        this.store = store;
        this.supplyType = supplyType;
        this.volume = volume;
        this.price = price;
        this.willTaken = willTaken;
        this.comment = comment;
        this.numberOzon = numberOzon;
        this.supplyTitle = supplyTitle;
        this.boxes = boxes;
        this.orderDate = orderDate;
        this.status = status;
        this.changeable = changeable;
        this.id = id;
    }
}