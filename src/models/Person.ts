export class Person {
    name: string;
    email: string;
    password: string;
    photo?: string;

    constructor(name: string, email: string, password: string, photo?: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.photo = photo;
    }
}
