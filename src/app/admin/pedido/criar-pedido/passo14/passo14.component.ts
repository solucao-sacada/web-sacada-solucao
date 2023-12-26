import { PedidoService } from './../../../../services/pedido.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-passo14',
    templateUrl: './passo14.component.html',
    styles: [],
})
export class Passo14Component {
    constructor(public pedidoService: PedidoService) {}

    nextTab(): void {
        this.pedidoService.nextTab();
    }
    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
