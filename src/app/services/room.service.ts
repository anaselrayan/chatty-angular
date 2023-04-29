import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { RoomMessage } from "../model/room-message.model";
import { RoomDTO } from "../model/Room.dto";
import { Room } from "../model/room.model";
import { UserService } from "./user.service";

declare var SockJS: any;

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    baseUrl = 'http://localhost:8080/rooms';
    sockUrl = 'http://localhost:8080/ws/rooms/';
    webClient: any;
    sockConnected = false;
    closeCode!: number;
    currenActiveRoom: ReplaySubject<Room> = new ReplaySubject();
    roomListSize: ReplaySubject<number> = new ReplaySubject();
    sentMessageSignal: ReplaySubject<RoomMessage> = new ReplaySubject();
    receivedMessageSignal: ReplaySubject<RoomMessage> = new ReplaySubject();

    constructor(private http: HttpClient,
        private us: UserService) { }

    public getAllRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(this.baseUrl);
    }

    public getMyRooms(): Observable<Room[]> {
        const userContactId = this.us.userDetails.contactInfo.id;
        return this.http.get<Room[]>(`${this.baseUrl}/user/${userContactId}`);
    }

    public getGlobalRooms(): Observable<Room[]> {
        const userContactId = this.us.userDetails.contactInfo.id;
        return this.http.get<Room[]>(`${this.baseUrl}/except/${userContactId}`);
    }

    public deleteRoom(roomId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.baseUrl}/${roomId}`)
    }

    public lockRoom(roomId: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/lock/${roomId}`)
    }

    public unlockRoom(roomId: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/unlock/${roomId}`)
    }

    public establishConnection(roomId: number) {
        this.closeCode = 1000;
        // close the previous connection first
        if (this.sockConnected)
            this.webClient.close();

        // Try to initialize new connection
        this.webClient = new SockJS(`${this.sockUrl}?room_id=${roomId}`);

        // Successfully connected to the room
        this.sockConnected = true;

        this.webClient.onopen = () => {
            console.log(`Listening for Room:${roomId}`);
        };

        this.webClient.onclose = (_e: any) => {
            this.closeCode = _e.code;
        };

        this.webClient.onmessage = (_e: any) => {
            const payload: RoomMessage = JSON.parse(_e.data)
            this.receivedMessageSignal.next(payload);
        };

        this.webClient.onerror = (error: any) => {
            console.log('Error')
        };
    }

    public sendMessage(msg: RoomMessage) {
        this.webClient.send(JSON.stringify(msg));
    }

    public addRoom(room: RoomDTO): Observable<Room> {
        return this.http.post<Room>(this.baseUrl, room);
    }

}