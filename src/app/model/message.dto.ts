export class MessageDTO {
    sourceId: number;
    destId: number;
    content: string;
    sentAt!: Date;
    constructor(sourceId: number, destId: number, content: string) {
        this.sourceId = sourceId;
        this.destId = destId;
        this.content = content;
    }
}