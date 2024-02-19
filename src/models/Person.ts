export class Person {
    name: string | null;
    email: string | null;
    password: string | null;


    constructor(name: string | null, email: string | null, password: string | null) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
