export class MinimumUser {
    email: string;
    password: string;

    constructor(
        email: string,
        password: string,
    ) {
        this.email = email;
        this.password = password;
    }
}

export class User extends MinimumUser {
    age: string;
    name: string;
    lastName: string;

    constructor(
        email: string,
        password: string,
        age: string,
        name: string,
        lastName: string,
    ) {
        super(email, password)
        this.age = age;
        this.name = name;
        this.lastName = lastName;
    }
}