export class Person {
    name: string;
    email: string;
    password?: string;
    photo?: string;
    discount?: string;


    constructor(name: string, email: string, password?: string, photo?: string, discount?: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.photo = photo;
        this.discount = discount;
    }
}
