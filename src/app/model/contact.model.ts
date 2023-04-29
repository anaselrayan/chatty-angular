export class Contact {
    id!: number;
    name: string;
    phone: string;
    imageUrl!: string;

    constructor(name: string, phone: string) {
        this.name = name;
        this.phone = phone;
    }

}