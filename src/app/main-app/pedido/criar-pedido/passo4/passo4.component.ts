import { Component, Input } from '@angular/core';
import { MESSAGES } from 'src/app/main-app/utils/messages';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { Pedido } from 'src/app/models/pedido';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo4',
    templateUrl: './passo4.component.html',
    styles: [],
})
export class Passo4Component {
    @Input() pedido: PedidoJson;
    outro: boolean;

    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) {}

    ngOnInit(): void {}

    alterarCor(value: string): void {
        if (value === 'other') {
            this.outro = true;
            this.pedidoService.pedido.balcony.aluminium.color = {
                black: false,
                bz1001: false,
                bz1002: false,
                bz1003: false,
                mat: false,
                white: false,
                other: null,
            };
        } else {
            this.outro = false;
            // Atualizar o valor selecionado
            this.pedidoService.pedido.balcony.aluminium.color = {
                black: value === 'black',
                bz1001: value === 'bz1001',
                bz1002: value === 'bz1002',
                bz1003: value === 'bz1003',
                mat: value === 'mat',
                white: value === 'white',
                other: null,
            };
        }
    }

    nextTab(): void {
        const colors = this.pedidoService.pedido.balcony.aluminium.color;
        if (
            colors.black ||
            colors.bz1002 ||
            colors.bz1001 ||
            colors.bz1003 ||
            colors.mat ||
            colors.white ||
            this.outro
        ) {
            if (this.outro) {
                if (colors.other) {
                    {this.pedidoService.nextTab(); this.pedidoService.saveDraftPedido(this.pedidoService.pedido);}
                } else this._toaster.warn(MESSAGES.UMA_OPCAO);
            } else {this.pedidoService.nextTab();this.pedidoService.saveDraftPedido(this.pedidoService.pedido);}
        } else this._toaster.warn(MESSAGES.UMA_OPCAO);
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
