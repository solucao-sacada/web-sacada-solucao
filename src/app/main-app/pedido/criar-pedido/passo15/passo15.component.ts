import { Component, OnInit } from '@angular/core';
import { MESSAGES } from 'src/app/main-app/utils/messages';
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
export class Passo15Component implements OnInit {
    medidas: any[] = [];
    menorAltura = 0;
    menorAlturaTeto = 0;
    diferencaPrimeiraPontoUltimoPontoTeto = 0;
    diferencaPrimeiraPontoUltimoPontoPiso = 0;
    prolongadorTeto = 0;
    prolongadorPiso = 0;
    visible = false
    addProlongadorTeto = false
    messageFixViga = false
    addProlongadorPiso = false
    messageFixBase = false
    showHR = false



    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) { }

    ngOnInit(): void {
        this.prolongadorPiso = 0
        this.prolongadorTeto = 0
        if(this.pedidoService.pedido.balcony){
            this.inicializarLinhas();
            this.menorAltura = this.verificarMenorAltura();
        }
    }

    validateNumberInput(event: KeyboardEvent) {
        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete', '.'];
        const isNumber = /\d/.test(event.key);
    
        if (!isNumber && !allowedKeys.includes(event.key)) {
          event.preventDefault();
        }
      }

    private inicializarLinhas(): void {
        if (!this.pedidoService.pedido.balcony) {
            return
        } {
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

        if (this.medidas[0] && this.medidas[this.medidas.length - 1]) {
            this.diferencaPrimeiraPontoUltimoPontoTeto = Math.abs(Number(this.medidas[0].ceiling) - Number(this.medidas[this.medidas.length - 1].ceiling))

            this.diferencaPrimeiraPontoUltimoPontoPiso = Math.abs(Number(this.medidas[0].floor) - Number(this.medidas[this.medidas.length - 1].floor))

            if(this.diferencaPrimeiraPontoUltimoPontoTeto === 0 && this.diferencaPrimeiraPontoUltimoPontoPiso === 0){
                // zerar prolongadores
                this.resetAllValues();
            }
        }

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
            let menorAltura = menorAlturaTeto + menorAlturaPiso;
            this.menorAltura = menorAltura;
            return menorAltura;
        } else {
            return 0;
        }

    }

    checkHeightDifference(): void {
        const firstCeiling = +this.medidas[0].ceiling;
        const lastCeiling = +this.medidas[this.medidas.length - 1].ceiling;
        const firstFloor = +this.medidas[0].floor;
        const lastFloor = +this.medidas[this.medidas.length - 1].floor;

        const differenceCeiling = Math.abs(firstCeiling - lastCeiling);
        const differenceFloor = Math.abs(firstFloor - lastFloor);

        if (differenceCeiling > 15 || differenceFloor > 15) {
            this.visible = true;
        } else {
            this.visible = false;
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

    verificarProlongadores(): void {
        const fixValues = this.fixedValues();
        if (fixValues) return
        this.resetValues()
        if (this.prolongadorPiso > 35 || this.prolongadorTeto > 40) {
            this.visible = true
            return
        } else {
            this.nextTab()
        }

    }

    resetValues(): void {
        if (this.diferencaPrimeiraPontoUltimoPontoTeto < 21) {
            this.prolongadorTeto = 0
        }

        if (this.diferencaPrimeiraPontoUltimoPontoPiso < 20) {
            this.prolongadorPiso = 0
        }
    }
    resetAllValues(): void {
        this.menorAlturaTeto = 0;
        this.diferencaPrimeiraPontoUltimoPontoTeto = 0;
        this.diferencaPrimeiraPontoUltimoPontoPiso = 0;
        this.prolongadorTeto = 0;
        this.prolongadorPiso = 0;
        this.visible = false
        this.addProlongadorTeto = false
        this.messageFixViga = false
        this.addProlongadorPiso = false
        this.messageFixBase = false
        this.showHR = false

    }

    fixedValues(): boolean {
        let block = false

        if (!block) {
            // mostrar valores para corrigir a viga
            if (this.diferencaPrimeiraPontoUltimoPontoTeto >= 21 && this.prolongadorTeto === 0) {
                this.addProlongadorTeto = true
                block = true
            }

            if (this.diferencaPrimeiraPontoUltimoPontoTeto >= 41 && this.prolongadorTeto === 0) {
                this.messageFixViga = true
                block = true
            }

            // mostrar valores para corrigir a base
            if (this.diferencaPrimeiraPontoUltimoPontoPiso >= 20 && this.prolongadorPiso === 0) {
                this.addProlongadorPiso = true
                block = true
            }

            if (this.diferencaPrimeiraPontoUltimoPontoPiso >= 35 && this.prolongadorPiso === 0) {
                this.messageFixBase = true
                block = true
            }

            if (this.diferencaPrimeiraPontoUltimoPontoTeto >= 21 &&
                this.diferencaPrimeiraPontoUltimoPontoPiso >= 20 &&
                this.prolongadorTeto === 0 &&
                this.prolongadorPiso === 0
            ) {
                this.showHR = true
                block = true
            }
        }

        if (block) {
            // this._toaster.warn('Preencha os campos para corrigir a viga ou a base')
            return true
        }

        return false
    }

    nextTab(): void {
        this.checkHeightDifference();
        this.salvar();
        this.pedidoService.pedido.balcony.levels.measures.highest_prolongation = this.prolongadorTeto.toString();
        this.pedidoService.pedido.balcony.levels.measures.lower_prolongation = this.prolongadorPiso.toString();
        let hasError = true;
        this.medidas.map((medida) => {
            if (medida.ceiling && medida.floor) hasError = false;
            else hasError = true;
        });
        if (hasError) {
            this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
        } else {
            this.visible = false
            this.pedidoService.nextTab();
        }
    }
    prevTab(): void {
        this.pedidoService.prevTab();
    }

    naoContinuar(): void {
        this.visible = false
    }

    simContinuar(): void {
        this.nextTab()
        this.visible = false
    }
}
