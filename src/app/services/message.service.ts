import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { Message } from "../model/message.model";
import { UserService } from "./user.service";
declare var SockJS: any;

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    userContactId = this.us.userDetails.contactInfo.id;
    selectedContactsId: ReplaySubject<number> = new ReplaySubject();
    receivedMessageSignal: ReplaySubject<Message> = new ReplaySubject();
    sentMessageSignal: ReplaySubject<Message> = new ReplaySubject();
    webClient: any;
    sockConnected = false;

    baseUrl = 'http://localhost:8080/messages';
    sockUrl = 'http://localhost:8080/ws/messages';

    constructor(private http: HttpClient,
        private us: UserService) { }

    public getHistoryMessages(c1: number, c2: number): Observable<Message[]> {
        const url = `${this.baseUrl}/${c1}/${c2}`;
        return this.http.get<Message[]>(url);
    }

    public sendMessage(msg: Message) {
        this.webClient.send(JSON.stringify(msg));
    }

    public establishSocketConnection() {

        if (!this.sockConnected) {
            const userContactId = this.us.userDetails.contactInfo.id;
            this.webClient = new SockJS(`${this.sockUrl}?user_id=${userContactId}`);
            this.sockConnected = true;

            this.webClient.onopen = () => {
                console.log('[Messages listening...]');
            };

            this.webClient.onmessage = (_e: any) => {
                const payload: Message = JSON.parse(_e.data)
                this.receivedMessageSignal.next(payload);
            };

            this.webClient.onclose = function () {
                console.log('connection lost!')
            };

            this.webClient.onError = (error: any) => {
                console.log(error)
            };
        }
    }

}