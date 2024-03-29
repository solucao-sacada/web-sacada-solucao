import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { BuscaCepService } from 'src/app/services/busca-cep.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { CriarPedidoComponent } from './criar-pedido/criar-pedido.component';
import { Passo1Component } from './criar-pedido/passo1/passo1.component';
import { Passo10Component } from './criar-pedido/passo10/passo10.component';
import { Passo11Component } from './criar-pedido/passo11/passo11.component';
import { Passo12Component } from './criar-pedido/passo12/passo12.component';
import { Passo13Component } from './criar-pedido/passo13/passo13.component';
import { Passo14Component } from './criar-pedido/passo14/passo14.component';
import { Passo15Component } from './criar-pedido/passo15/passo15.component';
import { Passo2Component } from './criar-pedido/passo2/passo2.component';
import { Passo3Component } from './criar-pedido/passo3/passo3.component';
import { Passo4Component } from './criar-pedido/passo4/passo4.component';
import { Passo5Component } from './criar-pedido/passo5/passo5.component';
import { Passo6Component } from './criar-pedido/passo6/passo6.component';
import { Passo7Component } from './criar-pedido/passo7/passo7.component';
import { Passo8Component } from './criar-pedido/passo8/passo8.component';
import { Passo9Component } from './criar-pedido/passo9/passo9.component';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';
import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoComponent } from './pedido.component';
import { Passo16Component } from './criar-pedido/passo16/passo16.component';
import { Passo17Component } from './criar-pedido/passo17/passo17.component';
import { Passo18Component } from './criar-pedido/passo18/passo18.component';

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
        Passo9Component,
        Passo10Component,
        Passo11Component,
        Passo12Component,
        Passo13Component,
        Passo14Component,
        Passo15Component,
        Passo16Component,
        Passo17Component,
        Passo18Component,
    ],
    imports: [CommonModule, PedidoRoutingModule, ComponentsModule],
    providers: [BuscaCepService, PedidoService],
})
export class PedidoModule {}
