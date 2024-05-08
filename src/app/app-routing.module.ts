import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainAppLayoutComponent } from './layout/main-app-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { CreateAccountComponent } from './demo/components/auth/create-account/create-account.component';
import { VerificationComponent } from './demo/components/auth/verification/verification.component';
import { AccountDetailsComponent } from './demo/components/auth/account-details/account-details.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'app',
                    component: MainAppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import('./main-app/main-app.module').then(
                                    (m) => m.MainAppModule
                                ),
                        },
                    ],
                    canActivate: [AuthGuard],
                },
                {
                    path: '',
                    redirectTo: 'app',
                    pathMatch: 'full',
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                    canActivate: [RedirectGuard],
                },
                {
                    path: 'verification/:token/:email', component: VerificationComponent,
                },
                {
                    path: 'account-details', component: AccountDetailsComponent,
                },
                { 
                    path: 'notfound', component: NotfoundComponent 
                },
                { 
                    path: '**', redirectTo: '/notfound' 
                },

            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            },
           
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
