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

            :host ::ng-deep .p-inputtext {
                border:none;
                text-align: center;
                padding: 0;
            }

            :host ::ng-deep .p-inputtext:enabled:focus {
                outline:none;
                border: none;
                box-shadow: none;
            }

            ::ng-deep .green-300 .p-inputtext{
                background-color: var(--green-200);
                padding: 0;
            }

        `,
    ],
})
export class Passo9Component implements OnInit {
    linhasTabela: number = 0;
    linhas: any[] = [];
    total: number = 0;

    vidrosRestantes!: number;
    showVidrosRestantes = true;

    constructor(
        public pedidoService: PedidoService,
        private _toster: ToasterService
    ) {}

    ngOnInit(): void {
        this.total = Number(this.pedidoService.pedido.balcony.dimensions.total)
        this.pedidoService.getObservable().subscribe((data) => {
            if (data) {
                this.pedidoService.pedido = data;
                this.update();
            }
        });
        this.inicializarLinhas();
    }

    private inicializarLinhas(): void {
        if (
            this.pedidoService.pedido.balcony.dimensions.data &&
            this.pedidoService.pedido.balcony.dimensions.data.length > 0
        ) {
            this.linhas = this.pedidoService.pedido.balcony.dimensions.data.map(
                (linha, index) => ({
                    piece: index + 1,
                    angle: linha[1] || '',
                    dimension: linha[2] || '',
                    quantity: linha[3] || '',
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
        this.linhas.forEach((linha) => this.calcularAtualizarQuantity(linha));
    }

    private atualizarVidrosRestantes(): void {
        // Calcula a quantidade total de peças
        const totalPieces = this.linhas.reduce(
            (total, linha) => total + (linha.quantity ? +linha.quantity : 0),
            0
        );
        // Define a quantidade de vidros restantes como a diferença entre a quantidade inicial de peças e a quantidade de peças adicionadas
        this.vidrosRestantes = this.linhasTabela - Number(totalPieces);

        // Garante que os vidros restantes não sejam negativos
        this.vidrosRestantes = Math.max(0, this.vidrosRestantes);
    }

    update() {
        this.linhasTabela = this.pedidoService.getQtdPecas();
        this.inicializarLinhas();
        this.atualizarVidrosRestantes();
    }

    verificarAtualizarQuantidadeDeVidro(linha): void {
        const dimensao = parseFloat(linha.dimension);
        if (dimensao >= 500) {
            linha.quantity = Math.floor(dimensao / 500);
        } else {
            linha.quantity = ''; // Limpa a quantidade se a dimensão for menor que 500
        }
        this.atualizarVidrosRestantes(); // Chama a função após adicionar ou remover um vidro
    }


    salvarDimensoes(): void {
        this.pedidoService.pedido.balcony.dimensions.data = this.linhas.map(
            (linha) => [
                linha.piece.toString(),
                parseFloat(linha.angle).toFixed(1),
                String(linha.dimension),
                String(linha.quantity),
            ]
        );

        if(this.total > 0){
            this.pedidoService.pedido.balcony.dimensions.total = parseFloat(this.total.toString()).toFixed(1);
        }

        this.atualizarVidrosRestantes();
    }

    limpar() {
        this.pedidoService.pedido.balcony.dimensions.data = [];
        this.pedidoService.pedido.balcony.dimensions.total = '';
        this.inicializarLinhas(); // Chamando esta função para reinicializar as linhas após a limpeza
        this.atualizarVidrosRestantes(); // Atualizando vidrosRestantes após a limpeza
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

    private getTotalVidros(): number {
        return this.linhas.reduce((total, linha) => total + (linha.quantity ? +linha.quantity : 0), 0);
    }

    _nextTab(): void {
        this.salvarDimensoes();

        // Verifica se todos os campos obrigatórios foram preenchidos
        if (
            this.linhas.some(
                (linha) =>
                    !linha.angle ||
                    !linha.dimension ||
                    !linha.quantity ||
                    !this.pedidoService.pedido.balcony.dimensions.total
            )
        ) {
            this._toster.warn('Preencha todos os campos obrigatórios');
        } else {
            // Calcula a quantidade total de vidros
            const totalVidros = this.getTotalVidros();

            // Verifica se a quantidade total de vidros excede a quantidade total de peças
            if (totalVidros > this.linhasTabela) {
                this._toster.warn('Você selecionou mais vidros do que peças disponíveis. Por favor, ajuste as quantidades.');
            } else {
                // Verifica se a quantidade total de vidros corresponde à quantidade de peças quando a dimensão é 500 ou mais
                const vidrosDimensao500Mais = this.linhas.filter(linha => parseFloat(linha.dimension) >= 500)
                                                             .reduce((total, linha) => total + (linha.quantity ? +linha.quantity : 0), 0);
                if (vidrosDimensao500Mais !== totalVidros) {
                    this._toster.warn('A quantidade de vidros selecionada não corresponde à quantidade de peças quando a dimensão é 500 ou mais.');
                } else {
                    this.pedidoService.nextTab();
                }
            }
        }
    }

    _prevTab(): void {
        this.pedidoService.prevTab();
    }

    updatePedido(value: string): void {
        this.pedidoService.pedido.balcony.dimensions.total = parseFloat(value).toFixed(1);
    }
}
