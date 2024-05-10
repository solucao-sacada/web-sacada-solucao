import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'error',
                loadChildren: () =>
                    import('./error/error.module').then((m) => m.ErrorModule),
            },
            {
                path: 'access',
                loadChildren: () =>
                    import('./access/access.module').then(
                        (m) => m.AccessModule
                    ),
            },
            {
                path: 'login',
                loadChildren: () =>
                    import('./login/login.module').then((m) => m.LoginModule),
            },
            {
                path: 'create-account',
                loadChildren: () =>
                    import('./create-account/create-account.module').then((m)=> m.CreateAccountModule),
            },
            {
                path: 'account-details',
                loadChildren: () =>
                    import('./account-details/account-details.module').then((m)=> m.AccountDetailsModule),
            },
            {
                path: 'verrification',
                loadChildren: () =>
                    import('./verification/verification.module').then((m)=> m.VerificationModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import('./reset-password/reset-password.module').then((m)=> m.ResetPasswordModule),
            },
            {
                path: 'password-update',
                loadChildren: () =>
                    import('./password-update/password-update.module').then((m)=> m.PasswordUpdateModule),
            }
        ]),
    ],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
