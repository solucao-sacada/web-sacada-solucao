import { Component } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo11',
    templateUrl: './passo11.component.html',
    styles: [],
})
export class Passo11Component {
    constructor(public pedidoService: PedidoService) {}

    difference = '';

    visible = false;

    ngOnInit(): void {
        this.openOverlay();
    }

    openOverlay() {
        const result = Math.abs(
            +this.pedidoService.pedido.balcony.plumb.right_wall.bottom -
                +this.pedidoService.pedido.balcony.plumb.right_wall.top
        );
        this.difference = result.toString() + 'mm';
        if (result >= 8) {
            this.visible = true;
        } else {
            this.visible = false;
        }
    }
}
