import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    valCheck: string[] = ['remember'];

    email!: string;
    password!: string;

    constructor(
        public layoutService: LayoutService,
        private _auth: AuthService,
        private _router: Router,
        private toaster: ToasterService
    ) {}

    login() {
        this._auth.signIn(this.email, this.password).subscribe({
            next: (response) => {
                    this._auth.setUser(response.user);
                    localStorage.setItem('token', response.accessToken);
                    localStorage.setItem('refreshToken', JSON.stringify(response.refreshToken));
                    this._router.navigate(['/app']);
                },
            error: (error) => {
                this.toaster.error(error.message);
            }
        })
        // this._auth.signIn(this.email, this.password).subscribe((response) => {
        //     this._auth.setUser(response.user);
        //     localStorage.setItem('token', response.accessToken);
        //     localStorage.setItem('refreshToken', JSON.stringify(response.refreshToken));
        //     this._router.navigate(['/app']);
        // });
    }
}
