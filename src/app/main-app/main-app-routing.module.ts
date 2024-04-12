import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
            {
                path: 'informacoes-pessoais',
                loadChildren: () =>
                    import('./info-pessoal/info-pessoal.module').then(
                        (m) => m.InfoPessoalModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class MainAppRoutingModule {}
