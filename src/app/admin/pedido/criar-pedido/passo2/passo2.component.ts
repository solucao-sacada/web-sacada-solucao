import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';

@Component({
    selector: 'app-passo2',
    templateUrl: './passo2.component.html',
    styles: [],
})
export class Passo2Component {
    @Input() pedido: Pedido;

    changeTip(value: string) {
        if (value === 'better_adjustment') {
            this.pedido.passo2.better_adjustment = true;
            this.pedido.passo2.defined.isDefined = false;
            this.pedido.passo2.defined.glass_quantity = null;
        } else {
            this.pedido.passo2.better_adjustment = false;
            this.pedido.passo2.defined.isDefined = true;
        }
    }
}
