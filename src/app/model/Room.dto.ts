import { Contact } from "./Contact.model";

export class RoomDTO {
    name: string;
    contact: Contact;

    constructor(name: string, contact: Contact) {
        this.name = name;
        this.contact = contact;
    }
}