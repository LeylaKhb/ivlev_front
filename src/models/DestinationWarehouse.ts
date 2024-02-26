import {Supply} from "./Supply";

export class DestinationWarehouse {
    supply: Supply;
    warehouse: string;


    constructor(supply: Supply, warehouse: string) {
        this.supply = supply;
        this.warehouse = warehouse;
    }
}