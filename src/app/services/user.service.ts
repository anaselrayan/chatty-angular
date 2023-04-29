import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AppUser } from "../model/app-user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    baseURL = 'http://localhost:8080/user';
    userDetails!: AppUser;

    constructor(private http: HttpClient) {}

    public loadUserByPhone(phone: string): Observable<AppUser> {
        return this.http.get<AppUser>(`${this.baseURL}/${phone}`);
    }
}