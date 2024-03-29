import { Component, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MESSAGES } from 'src/app/main-app/utils/messages';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo10',
    templateUrl: './passo10.component.html',
    styles: [],
})
export class Passo10Component {
    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) {}

    difference = '';
    visible = false;

    ngOnInit(): void {
        this.pedidoService.getObservable().subscribe(() => {
            this.openOverlay();
        });
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
        const result = Math.abs(
            +this.pedidoService.pedido.balcony.plumb.left_wall.bottom -
            +this.pedidoService.pedido.balcony.plumb.left_wall.top
        );
        if (
            this.pedidoService.pedido.balcony.plumb.left_wall.bottom &&
            this.pedidoService.pedido.balcony.plumb.left_wall.top
        ) {
            this.pedidoService.nextTab();
            // if (result < 8) {
            // }
            // else {
            //     this._toaster.warn('Perfil fora do esquadro, por favor ajuste');
            // }
        } else {
            this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
        }
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
