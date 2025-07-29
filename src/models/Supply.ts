import {DepartureCity} from "./DepartureCity";
import {DestinationWarehouse} from "./DestinationWarehouse";

export class Supply {
    departureDate: Date;
    acceptanceDate: Date;
    title: string;
    warehouses: DestinationWarehouse[];
    departureCities: DepartureCity[];
    ozon: boolean;


    constructor(departureDate: Date, acceptanceDate: Date, title: string, warehouses: DestinationWarehouse[],
                departureCities: DepartureCity[], isOzon: boolean) {
        this.departureDate = departureDate;
        this.acceptanceDate = acceptanceDate;
        this.title = title;
        this.warehouses = warehouses;
        this.departureCities = departureCities;
        this.ozon = isOzon;
    }
}