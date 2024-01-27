import { Component } from '@angular/core';
import { MESSAGES } from 'src/app/admin/utils/messages';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo15',
    templateUrl: './passo15.component.html',
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
export class Passo15Component {
    medidas: any[] = [];
    menorAltura = 0;

    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) {}

    ngOnInit(): void {
        this.pedidoService.getObservable().subscribe(() => {
            this.inicializarLinhas();
            this.menorAltura = this.verificarMenorAltura();
        });
    }

    private inicializarLinhas(): void {
        if (
            this.pedidoService.pedido.balcony.levels.measures.data &&
            this.pedidoService.pedido.balcony.levels.measures.data.length > 0
        ) {
            this.medidas =
                this.pedidoService.pedido.balcony.levels.measures.data.map(
                    (linha, index) => ({
                        ponto: this.incrementAlpha(index),
                        ceiling: linha[0] || '',
                        floor: linha[1] || '',
                    })
                );
        } else {
            this.medidas = Array.from({ length: 1 }, (_, index) => ({
                ponto: this.incrementAlpha(index),
                ceiling: '',
                floor: '',
            }));
        }
    }

    public newMeasure() {
        const index = this.medidas.length;
        this.medidas.push({
            ponto: this.incrementAlpha(index),
            ceiling: '',
            floor: '',
        });
    }

    remove(index: number) {
        this.medidas.splice(index, 1);
    }

    private incrementAlpha(index) {
        let result = '';
        const base = 'A'.charCodeAt(0);

        while (index >= 0) {
            result = String.fromCharCode(base + (index % 26)) + result;
            index = Math.floor(index / 26) - 1;
        }

        return result;
    }

    verificarMenorAltura(): number {
        let menorAlturaTeto = Infinity;
        let menorAlturaPiso = Infinity;

        for (let i = 0; i < this.medidas.length; i++) {
            const alturaTeto = +this.medidas[i].ceiling;
            const alturaPiso = +this.medidas[i].floor;

            if (!isNaN(alturaTeto) && alturaTeto < menorAlturaTeto) {
                menorAlturaTeto = alturaTeto;
            }

            if (!isNaN(alturaPiso) && alturaPiso < menorAlturaPiso) {
                menorAlturaPiso = alturaPiso;
            }
        }

        // Check if both values are valid (not Infinity) before returning their sum
        if (menorAlturaTeto !== Infinity && menorAlturaPiso !== Infinity) {
            return menorAlturaTeto + menorAlturaPiso;
        } else {
            return 0;
        }
    }

    salvar() {
        this.pedidoService.pedido.balcony.levels.measures.data =
            this.medidas.map((linha) => [linha.ceiling, linha.floor]);

        const ceilings = this.medidas.map((medida) => +medida.ceiling);
        const floors = this.medidas.map((medida) => +medida.floor);

        this.pedidoService.pedido.balcony.levels.measures.lower_ceiling =
            ceilings
                .reduce((menorAltura, alturaAtual) => {
                    return alturaAtual < menorAltura
                        ? alturaAtual
                        : menorAltura;
                }, Infinity)
                .toString();

        this.pedidoService.pedido.balcony.levels.measures.lower_floor = floors
            .reduce((menorAltura, alturaAtual) => {
                return alturaAtual < menorAltura ? alturaAtual : menorAltura;
            }, Infinity)
            .toString();

        this.pedidoService.pedido.balcony.levels.measures.highest_ceiling =
            ceilings
                .reduce((maiorAltura, alturaAtual) => {
                    return alturaAtual > maiorAltura
                        ? alturaAtual
                        : maiorAltura;
                }, -Infinity)
                .toString();

        this.pedidoService.pedido.balcony.levels.measures.highest_floor = floors
            .reduce((maiorAltura, alturaAtual) => {
                return alturaAtual > maiorAltura ? alturaAtual : maiorAltura;
            }, -Infinity)
            .toString();

        this.pedidoService.pedido.balcony.levels.full_aperture =
            this.verificarMenorAltura().toString();
    }

    nextTab(): void {
        this.salvar();
        let hasError = true;
        this.medidas.map((medida) => {
            if (medida.ceiling && medida.floor) hasError = false;
            else hasError = true;
        });
        if (hasError) {
            this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
        } else this.pedidoService.nextTab();
    }
    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
