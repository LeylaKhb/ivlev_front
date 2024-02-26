import {Supply} from "./Supply";

export class DepartureCity {
    supply: Supply;
    city: string;

    constructor(supply: Supply, city: string) {
        this.supply = supply;
        this.city = city;
    }
}