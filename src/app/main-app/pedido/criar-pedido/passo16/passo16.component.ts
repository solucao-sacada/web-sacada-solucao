import { Component } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo16',
    templateUrl: './passo16.component.html',
    styles: [],
})
export class Passo16Component {
    constructor(public pedidoService: PedidoService) {}

    nextTab(): void {
        this.pedidoService.nextTab();
    }
    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
