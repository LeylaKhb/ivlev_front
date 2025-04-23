export class AdminRequest {
    departureCity: string;
    store: string;
    sendCity: string;
    phoneNumber: string;
    entity: string;
    startDepartureDate: Date | null;
    endDepartureDate: Date | null;
    startOrderDate: Date | null;
    endOrderDate: Date | null;
    acceptanceDate: Date | null;
    status: string;
    sortBy: string;


    constructor(departureCity: string, store: string, sendCity: string, phoneNumber: string, entity: string,
                startDepartureDate: Date | null, endDepartureDate: Date | null, startOrderDate: Date | null,
                endOrderDate: Date | null, acceptanceDate: Date | null, status: string, sortBy: string) {
        this.departureCity = departureCity;
        this.store = store;
        this.sendCity = sendCity;
        this.phoneNumber = phoneNumber;
        this.entity = entity;
        this.startDepartureDate = startDepartureDate;
        this.endDepartureDate = endDepartureDate;
        this.startOrderDate = startOrderDate;
        this.endOrderDate = endOrderDate;
        this.acceptanceDate = acceptanceDate;
        this.status = status;
        this.sortBy = sortBy;
    }
}
