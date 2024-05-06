import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainAppLayoutComponent } from './layout/main-app-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';

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
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
