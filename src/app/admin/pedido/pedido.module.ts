import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { Passo1Component } from './criar-pedido/passo1/passo1.component';
import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoComponent } from './pedido.component';
import { CriarPedidoComponent } from './criar-pedido/criar-pedido.component';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';
import { Passo2Component } from './criar-pedido/passo2/passo2.component';
import { BuscaCepService } from 'src/app/services/busca-cep.service';
import { Passo3Component } from './criar-pedido/passo3/passo3.component';
import { Passo4Component } from './criar-pedido/passo4/passo4.component';
import { Passo5Component } from './criar-pedido/passo5/passo5.component';
import { Passo6Component } from './criar-pedido/passo6/passo6.component';
import { Passo7Component } from './criar-pedido/passo7/passo7.component';
import { Passo8Component } from './criar-pedido/passo8/passo8.component';

@NgModule({
    declarations: [
        PedidoComponent,
        Passo1Component,
        CriarPedidoComponent,
        ListarPedidosComponent,
        Passo2Component,
        Passo3Component,
        Passo4Component,
        Passo5Component,
        Passo6Component,
        Passo7Component,
        Passo8Component,
    ],
    imports: [CommonModule, PedidoRoutingModule, ComponentsModule],
    providers: [BuscaCepService],
})
export class PedidoModule {}
