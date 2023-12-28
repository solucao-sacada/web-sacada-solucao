import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
        private _router: Router
    ) {}

    login() {
        this._auth.signIn(this.email, this.password).subscribe((response) => {
            console.log(response);
            this._auth.setUser(response.user);
            this._router.navigate(['/admin']);
        });
    }
}
