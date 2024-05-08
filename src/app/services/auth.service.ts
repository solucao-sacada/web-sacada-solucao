import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user.model';
import { LoadingService } from '../components/loading/loading.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiUrl = environment.API_URL;
    private ldService = inject(LoadingService);


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

    validateAccount(email: string, token: string): Observable<any> {
        this.ldService.start();
        const params = new HttpParams()
        .set('email', email)
        .set('token', token)
        return this._http
          .patch(this.apiUrl + '/users/verify-email', {}, { params })
          .pipe(finalize(() => this.ldService.stop())
          );
    
      }
}
