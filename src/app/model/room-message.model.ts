import { Contact } from "./Contact.model";

export class RoomMessage {
    content!: string;
    source!: Contact;
    sentAt!: Date;
    type!: number; // 0: info && 1: received && -1:sent
    imageVisible: boolean = true;

    constructor(content: string, source: Contact, type: number) {
        this.content = content
        this.source = source
        this.type = type;
        this.sentAt = new Date()
    }
}