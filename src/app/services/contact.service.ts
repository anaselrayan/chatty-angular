import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Contact } from "../model/Contact.model";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    contactListSize = new BehaviorSubject<number>(1);
    baseUrl: string = 'http://localhost:8080/contacts';
    
    constructor(private http: HttpClient) {}

    public getUserContacts(userId: number):Observable<Contact[]> {
        return this.http.get<Contact[]>(`${this.baseUrl}/user/${userId}`);
    }

    public getContactById(contactId: number): Observable<Contact> {
        return this.http.get<Contact>(`${this.baseUrl}/${contactId}`);
    }

    public getContactByPhone(phone: string, userId: number): Observable<Contact> {
        const url = `${this.baseUrl}/user/add?contactPhone=${phone}&userId=${userId}`;
        return this.http.get<Contact>(url)
    }

    public removeContact(userId: number, contactId: number): Observable<boolean> {
        const url = `${this.baseUrl}/user/delete?userId=${userId}&contactId=${contactId}`;
        return this.http.delete<boolean>(url);
    }
}