import { Contact } from "./Contact.model";

export class Message {
    content!: string;
    sentAt!: Date;
    source!: Contact;
    dest!: Contact;
    constructor(content: string, source: Contact, dest: Contact) {
        this.content = content;
        this.source = source;
        this.dest = dest;
        this.sentAt = new Date();
    }
}