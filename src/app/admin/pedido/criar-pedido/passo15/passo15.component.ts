import { Component } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo15',
    templateUrl: './passo15.component.html',
    styles: [],
})
export class Passo15Component {
    constructor(public pedidoService: PedidoService) {}

    nextTab(): void {
        this.pedidoService.nextTab();
    }
    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
