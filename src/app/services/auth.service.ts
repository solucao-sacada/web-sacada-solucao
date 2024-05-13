import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user.model';
import { LoadingService } from '../components/loading/loading.service';
import { Company } from '../models/company';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    token: string | null;
    RefreshToken: string | null;

    apiUrl = environment.API_URL;
    private ldService = inject(LoadingService);


    constructor(private _http: HttpClient, private router: Router)
        {
        this.token = localStorage.getItem('token');
        this.RefreshToken = localStorage.getItem('refreshToken');
      }

    signIn(email: string, password: string): Observable<UserResponse> {
        return this._http.post<UserResponse>(this.apiUrl + '/login', { email, password });
    }

    setUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }

    deleteUser(id: string, password?: string): Observable<any> {
        return this._http.delete<any>(this.apiUrl + '/users/' + id, { body: { password: password } });
    }

    getCompany(): Company {
        return JSON.parse(localStorage.getItem('/companies'));
    }

    isLogged(): boolean {
        return localStorage.getItem('user') ? true : false;
    }

    createAccount(user: User): Observable<any> {
        return this._http.post<any>(this.apiUrl + '/users', user);
    }

    updateAccount(user: User): Observable<User> { //backend retornar oque? USER? USER COMO? assim: user: {} ou assim: {user:{}} Oque fazer? Criar interface como o retorno no console log!
        return this._http.put<User>(this.apiUrl + '/users', user);
    }

    updateCompany(company: Company): Observable<Company> {
        return this._http.put<Company>(this.apiUrl + '/companies', company);
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
    sendLinkResetPassword(email: string): Observable<any> {
        return this._http.post<any>(this.apiUrl + '/users/forgot-password', { email: email });
    }

    resetPasswordUser(idUser: string, newPassword: string, oldPassword: string): Observable<any> {
        return this._http.patch<any>(this.apiUrl + `/users/password-update/${idUser}`, {
            newPassword: newPassword,
            oldPassword: oldPassword
        })
    }

    verificationEmail(email: string, token: string): Observable<User> {
        const payload = { token };
        const endpoint = `${this.apiUrl}/send-verification-email/${email}`;
        return this._http.post<User>(endpoint, payload);
    }

    resetPasswordByToken(token: string, password: string): Observable<string> {
        const params = new HttpParams().set('token', token);

        return this._http.patch<string>(this.apiUrl + '/users/reset-password', { password }, { params });
    }

    verifyToken(token: string): Observable<boolean> {
        return this._http.get<boolean>(this.apiUrl + '/users/verify-token'+ token);
    }
}
