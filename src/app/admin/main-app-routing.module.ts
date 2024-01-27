import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PedidoComponent } from './pedido/pedido.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: 'pedidos',
                loadChildren: () =>
                    import('./pedido/pedido.module').then(
                        (m) => m.PedidoModule
                    ),
            },
            {
                path: 'orcamentos',
                loadChildren: () =>
                    import('./orcamento/orcamento.module').then(
                        (m) => m.OrcamentoModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class MainAppRoutingModule {}
