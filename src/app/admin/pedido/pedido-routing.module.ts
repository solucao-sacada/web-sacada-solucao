import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PedidoComponent } from './pedido.component';
import { CriarPedidoComponent } from './criar-pedido/criar-pedido.component';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'novo', component: CriarPedidoComponent },
            { path: 'listar', component: ListarPedidosComponent },
            { path: '', redirectTo: 'novo', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class PedidoRoutingModule {}
