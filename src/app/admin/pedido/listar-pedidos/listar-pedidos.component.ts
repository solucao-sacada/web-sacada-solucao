import { Component } from '@angular/core';
import { Color, PedidoJson, Tip6 } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-listar-pedidos',
    templateUrl: './listar-pedidos.component.html',
    styleUrls: ['./listar-pedidos.component.scss'],
})
export class ListarPedidosComponent {
    pedidos: PedidoJson[] = [];
    pedido: PedidoJson;

    constructor(public pedidoService: PedidoService) {}

    ngOnInit(): void {
        this.pedidoService.listAll().subscribe((data) => {
            this.pedidos = data;
            this.pedido = data[0];
        });
    }

    getTipoSacada(value: Tip6): string {
        if (value.defined.isDefined) return 'DEFINIDO';
        else return 'MELHOR AJUSTE';
    }
    getColorAluminiun(value: Color): string {
        if (value.black) return 'PRETO';
        else if (value.bz1001) return 'BZ1001';
        else if (value.bz1002) return 'BZ1002';
        else if (value.bz1003) return 'BZ1003';
        else if (value.mat) return 'INCOLOR';
        else if (value.white) return 'BRANCO';
        else if (value.other) return value.other;
        else return '';
    }

    getQtdPecas(value: number): string {
        switch (value) {
            case 1:
                return '1';
            case 2:
            case 3:
                return '2';
            case 4:
                return '3';
            default:
                return this.pedido.balcony.format;
        }
    }

    getFormat(value: number): string {
        switch (value) {
            case 1:
                return 'Reto';
            case 2:
                return '"L" Esquerda';
            case 3:
                return '"R" Esquerda';
            case 4:
                return 'Formato U';
            default:
                return 'Outro';
        }
    }
}
