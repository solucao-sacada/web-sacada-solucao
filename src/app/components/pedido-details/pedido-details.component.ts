import { Component, Input, OnInit } from '@angular/core';
import { Color, PedidoJson, Tip6 } from 'src/app/models/pedidoJson';
import { ImageService } from 'src/app/services/image.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-pedido-details',
    templateUrl: './pedido-details.component.html',
    styleUrls: ['./pedido-details.component.scss'],
})
export class PedidoDetailsComponent {
    qtdLinhasDim: number;
    linhas: any[];
    constructor(
        public pedidoService: PedidoService,
        public imageService: ImageService
    ) {}

    @Input() set Pedido(value: PedidoJson) {
        this.pedido = value;
        this.dimensoes();
    }

    pedido: PedidoJson;

    getTipoSacada(value: Tip6): string {
        if (value?.defined.isDefined) return 'DEFINIDO';
        else return 'MELHOR AJUSTE';
    }
    getColorAluminiun(value: Color): string {
        if (value?.black) return 'PRETO';
        else if (value?.bz1001) return 'BZ1001';
        else if (value?.bz1002) return 'BZ1002';
        else if (value?.bz1003) return 'BZ1003';
        else if (value?.mat) return 'INCOLOR';
        else if (value?.white) return 'BRANCO';
        else if (value?.other) return value?.other;
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
                return this.pedido?.balcony.format;
        }
    }

    getFormat(value: number): string {
        switch (value) {
            case 1:
                return 'Reto';
            case 2:
                return '"L" Esquerda';
            case 3:
                return '"L" Direita';
            case 4:
                return 'Formato U';
            default:
                return 'Outro';
        }
    }

    get alinhamentoDaViga(): string {
        if (this.pedido?.balcony.beam.position.aligned) return 'Alinhado';
        else if (this.pedido?.balcony.beam.position.inside)
            return 'Desalinhado para Dentro';
        else return 'Desalinhado para Fora';
    }

    get trilhosSuperiores(): string {
        if (this.pedido?.balcony.rails.upper_rail.tip.normal) return 'Normal';
        else if (this.pedido?.balcony.rails.upper_rail.tab.inside)
            return 'Chapa de correção para dentro';
        else return 'Chapa de correção para fora';
    }

    get trilhosInferioresLenhaRef(): string {
        const tips = this.pedido?.balcony.rails.lower_rail.normal.tip;
        if (tips?.A) return 'A';
        else if (tips?.B) return 'B';
        else if (tips?.C) return 'C';
        else return 'Outros';
    }

    get trilhosInferiores(): string {
        const tips = this.pedido?.balcony.rails.lower_rail.tip;
        if (tips?.normal) return 'Normal';
        else if (tips?.tab) return 'Aba';
        else return 'Embutido';
    }

    dimensoes() {
        this.qtdLinhasDim = this.pedidoService.getQtdPecas(
            this.pedido?.balcony.format
        );
       this.linhas = this.pedido.balcony.dimensions.data.map(
            (linha, index) => ({
                piece: index + 1,
                angle: linha[1] || '', // Índice 1 representa o ângulo, ajuste conforme necessário
                dimension: linha[2] || '', // Índice 2 representa a dimensão, ajuste conforme necessário
                quantity: linha[3] || '', // Índice 3 representa a quantidade, ajuste conforme necessário
            })
        );

        return this.linhas
        console.log(this.linhas);
    }

    incrementAlpha(index) {
        let result = '';
        const base = 'A'.charCodeAt(0);

        while (index >= 0) {
            result = String.fromCharCode(base + (index % 26)) + result;
            index = Math.floor(index / 26) - 1;
        }

        return result;
    }
}
