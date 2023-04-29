export class LoginRequest {
    phone: string;
    password: string;
    constructor(phone: string, password: string) {
        this. phone = phone;
        this.password = password;
    }
}