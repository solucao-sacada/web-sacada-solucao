import { Component } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo17',
    templateUrl: './passo17.component.html',
    styles: [],
})
export class Passo17Component {
    constructor(public pedidoService: PedidoService) {}

    nextTab(): void {
        this.pedidoService.nextTab();
    }
    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
