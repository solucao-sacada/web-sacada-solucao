import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CriarPedidoComponent } from './criar-pedido/criar-pedido.component';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';
import { CanDeactivateGuard } from 'src/app/guards/can-dectivate.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'novo',
                component: CriarPedidoComponent,
                canDeactivate: [CanDeactivateGuard],
            },
            { path: 'listar', component: ListarPedidosComponent },
            { path: 'listar/:draft', component: ListarPedidosComponent },
            { path: '', redirectTo: 'novo', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class PedidoRoutingModule {}
