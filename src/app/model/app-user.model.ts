import { Contact } from "./Contact.model";

export class AppUser {
    id!: number;
    contactInfo!: Contact;
    contactList!: Contact[];
    joinedAt!: Date;
}