import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo9',
    templateUrl: './passo9.component.html',
    styles: [
        `
            textarea:focus,
            input:focus,
            select:focus {
                box-shadow: 0 0 0 0;
                border: 0 none;
                outline: 0;
            }

            input {
                box-shadow: 0 0 0 0;
                border: 0 none;
                outline: 0;
            }
        `,
    ],
})
export class Passo9Component implements OnInit {
    @Output() nextTab = new EventEmitter();
    @Output() prevTab = new EventEmitter();

    linhasTabela: number = 0;
    linhas: any[] = [];

    vidrosRestantes!: number;
    showVidrosRestantes = true;

    constructor(
        public pedidoService: PedidoService,
        private _toster: ToasterService
    ) {}

    ngOnInit(): void {
        this.update();

        this.pedidoService.getObservable().subscribe((data) => {
            console.log(data);
            if (data) {
                this.pedidoService.pedido = data;
                this.update();
            }
        });
    }

    private inicializarLinhas(): void {
        if (
            this.pedidoService.pedido.balcony.dimensions.data &&
            this.pedidoService.pedido.balcony.dimensions.data.length > 0
        ) {
            this.linhas = this.pedidoService.pedido.balcony.dimensions.data.map(
                (linha, index) => ({
                    piece: index + 1,
                    angle: linha[1] || '', // Índice 1 representa o ângulo, ajuste conforme necessário
                    dimension: linha[2] || '', // Índice 2 representa a dimensão, ajuste conforme necessário
                    quantity: linha[3] || '', // Índice 3 representa a quantidade, ajuste conforme necessário
                })
            );
        } else {
            this.linhas = Array.from(
                { length: this.linhasTabela },
                (_, index) => ({
                    piece: index + 1,
                    angle: '',
                    dimension: '',
                    quantity: '',
                })
            );
        }
    }

    private atualizarVidrosRestantes(): void {
        // Atualiza vidrosRestantes com base nas quantidades preenchidas

        this.vidrosRestantes = this.linhas.reduce(
            (total, linha) => total - (linha.quantity ? +linha.quantity : 0),
            this.pedidoService.pedido.balcony.tip.defined.glass_quantity
        );
    }

    salvarDimensoes(): void {
        this.pedidoService.pedido.balcony.dimensions.data = this.linhas.map(
            (linha) => [
                linha.piece.toString(),
                linha.angle.replace(',', '.'),
                linha.dimension,
                linha.quantity,
            ]
        );

        this.atualizarVidrosRestantes();
    }

    limpar() {
        this.pedidoService.pedido.balcony.dimensions.data = [];
        this.pedidoService.pedido.balcony.dimensions.total = '';
        this.inicializarLinhas(); // Chamando esta função para reinicializar as linhas após a limpeza
        this.atualizarVidrosRestantes(); // Atualizando vidrosRestantes após a limpeza
    }

    update() {
        switch (this.pedidoService.pedido.balcony.format) {
            case 1:
                this.linhasTabela = 1;
                break;
            case 2:
            case 3:
                this.linhasTabela = 2;
                break;
            case 4:
                this.linhasTabela = 3;
                break;
            default:
                this.linhasTabela = +this.pedidoService.pedido.balcony.format;
        }

        this.inicializarLinhas();
        this.atualizarVidrosRestantes();

        if (this.pedidoService.pedido.balcony.tip.better_adjustment)
            this.showVidrosRestantes = false;
        else this.showVidrosRestantes = true;
    }

    calcularAtualizarQuantity(linha: any): void {
        if (linha.dimension) {
            const valorDimension = parseFloat(linha.dimension);
            const quantidadeCalculada = Math.ceil(valorDimension / 810);
            linha.quantity = quantidadeCalculada.toString();
        } else {
            linha.quantity = ''; // Limpar quantity se dimension estiver vazio
        }
    }

    _nextTab(): void {
        if (
            this.linhas.some(
                (linha) =>
                    !linha.angle ||
                    !linha.dimension ||
                    !linha.quantity ||
                    !this.pedidoService.pedido.balcony.dimensions.total
            )
        ) {
            this._toster.warn('Preencha todos os campos obirgatórios');
        } else if (this.vidrosRestantes !== 0) {
            this._toster.warn(
                `${this.vidrosRestantes} vidros restantes, por favor preencha!`
            );
        } else this.nextTab.emit();
    }
    _prevTab(): void {
        this.prevTab.emit();
    }
}
