import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainAppLayoutComponent } from './layout/main-app-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

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
