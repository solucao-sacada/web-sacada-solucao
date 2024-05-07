import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiUrl = environment.API_URL;

    constructor(private _http: HttpClient) {}

    signIn(email: string, password: string): Observable<UserResponse> {
        return this._http.post<UserResponse>(this.apiUrl + '/login', { email, password });
    }

    setUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }

    isLogged(): boolean {
        return localStorage.getItem('user') ? true : false;
    }

    createAccount(user: User): Observable<any> {
        return this._http.post<any>(this.apiUrl + '/users', user);
    }
}
