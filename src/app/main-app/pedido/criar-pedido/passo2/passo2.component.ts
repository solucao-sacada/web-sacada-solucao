import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { Pedido } from 'src/app/models/pedido';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo2',
    templateUrl: './passo2.component.html',
    styles: [],
})
export class Passo2Component {
    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) {}

    ngOnInit(): void {}

    changeTip(value: string) {
        if (value === 'better_adjustment') {
            this.pedidoService.pedido.balcony.tip.better_adjustment = true;
            this.pedidoService.pedido.balcony.tip.defined.isDefined = false;
            this.pedidoService.pedido.balcony.tip.defined.glass_quantity = null;
        } else {
            this.pedidoService.pedido.balcony.tip.better_adjustment = false;
            this.pedidoService.pedido.balcony.tip.defined.isDefined = true;
            this.pedidoService.pedido.balcony.tip.defined.glass_quantity = null;
        }
    }

    onChangeQtdVidros() {
        this.pedidoService.notifyObservers();
    }

    nextTab(): void {
        if (
            !this.pedidoService.pedido.balcony.tip.better_adjustment &&
            !this.pedidoService.pedido.balcony.tip.defined.isDefined
        ) {
            this._toaster.warn('Por favor, selecione uma opção!');
        } else if (this.pedidoService.pedido.balcony.tip.defined.isDefined) {
            if (!this.pedidoService.pedido.balcony.tip.defined.glass_quantity)
                this._toaster.warn(
                    'Por favor, defina uma quantidade de vidros!'
                );
            else {
                this.pedidoService.nextTab()
            }
        } else {
            this.pedidoService.nextTab();
        }
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
