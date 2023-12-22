import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo2',
    templateUrl: './passo2.component.html',
    styles: [],
})
export class Passo2Component {
    constructor(public pedidoService: PedidoService) {}

    changeTip(value: string) {
        if (value === 'better_adjustment') {
            this.pedidoService.pedido.balcony.tip.better_adjustment = true;
            this.pedidoService.pedido.balcony.tip.defined.isDefined = false;
            this.pedidoService.pedido.balcony.tip.defined.glass_quantity = null;
        } else {
            this.pedidoService.pedido.balcony.tip.better_adjustment = false;
            this.pedidoService.pedido.balcony.tip.defined.isDefined = true;
        }
    }
}
