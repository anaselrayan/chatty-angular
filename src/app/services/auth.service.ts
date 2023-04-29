import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationResponse } from "../model/authentication-response.mode";
import { LoginRequest } from "../model/login-request.model";
import { RegisterRequest } from "../model/register-request.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = 'http://localhost:8080/auth';

    constructor(private http: HttpClient) {}

    public lgoin(request: LoginRequest): Observable<any> {
        
        return this.http.post(`${this.authUrl}/login`, request);
    }

    public register(request: RegisterRequest): Observable<any> {
        
        return this.http.post(`${this.authUrl}/register`, request);
    }
}