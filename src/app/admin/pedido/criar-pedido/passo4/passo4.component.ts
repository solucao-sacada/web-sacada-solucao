import { Component, Input } from '@angular/core';
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

    constructor(public pedidoService: PedidoService) {}

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
}
