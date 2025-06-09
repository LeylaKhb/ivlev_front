import {Company} from "./Company";

export class Person {
    name: string;
    email: string;
    password?: string;
    photo?: string;
    discount?: string;
    companies?: Company[];


    constructor(name: string, email: string, password?: string, photo?: string, discount?: string, companies?: Company[]) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.photo = photo;
        this.discount = discount;
        this.companies = companies;
    }
}
