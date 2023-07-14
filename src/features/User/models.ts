export class User {
    public name: string;
    public lastName: string;
    public age: number;
    public email: string;
    public password: string;

    constructor(
        name: string,
        lastName: string,
        age: number,
        email: string,
        password: string,
    ) {
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
    }
}