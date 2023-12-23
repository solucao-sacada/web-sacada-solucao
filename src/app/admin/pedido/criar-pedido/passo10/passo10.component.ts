import { Component, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo10',
    templateUrl: './passo10.component.html',
    styles: [],
})
export class Passo10Component {
    constructor(public pedidoService: PedidoService) {}

    difference = '';
    visible = false;

    ngOnInit(): void {
        this.openOverlay();
    }

    openOverlay() {
        const result = Math.abs(
            +this.pedidoService.pedido.balcony.plumb.left_wall.bottom -
                +this.pedidoService.pedido.balcony.plumb.left_wall.top
        );
        this.difference = result.toString() + 'mm';
        if (result >= 8) {
            this.visible = true;
        } else {
            this.visible = false;
        }
    }

    nextTab(): void {
        this.pedidoService.nextTab();
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
