export class RegisterRequest {
    fullName: string;
    phone: string;
    password: string;
    constructor(fullName: string, phone: string, password: string) {
        this.fullName = fullName;
        this. phone = phone;
        this.password = password;
    }
}