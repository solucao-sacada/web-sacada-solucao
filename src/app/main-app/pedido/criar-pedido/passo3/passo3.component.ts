import { Component, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MESSAGES } from 'src/app/main-app/utils/messages';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { Pedido } from 'src/app/models/pedido';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo3',
    templateUrl: './passo3.component.html',
    styles: [],
})
export class Passo3Component {
    corDoVidro: string;
    showDiv1: boolean = false;
    showDiv2: boolean = false;
    selectedButton: string = '';

    coresDoVidro: SelectItem<string>[] = [
        {
            label: 'Incolor',
            value: 'Incolor',
        },
        {
            label: 'Verde',
            value: 'Verde',
        },
        {
            label: 'Fumê',
            value: 'Fume',
        },
        {
            label: 'Bronze',
            value: 'Bronze',
        },
        {
            label: 'Outro',
            value: 'Outro',
        },
    ];

    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) { }

    ngOnInit(): void {
        this.pedidoService.getObservable().subscribe(() => {
            this.verify();
        });
    }

    // tipoVidro(value: string) {
    //     if (value === 'laminado') {
    //         this.pedidoService.pedido.balcony.glass.laminated = true;
    //         this.pedidoService.pedido.balcony.glass.tempered = false;
    //     }
    //     else if (value === 'Temperado') {
    //         this.pedidoService.pedido.balcony.glass.laminated = false;
    //         this.pedidoService.pedido.balcony.glass.tempered = true;
    //     }
    //     else if (value === 'laminadoTemperado') {
    //         this.pedidoService.pedido.balcony.glass.laminated = true;
    //         this.pedidoService.pedido.balcony.glass.tempered = true;
    //     }
    //     else {
    //     }
    // }

    tipoVidro(tipo: string) {
        this.selectedButton = tipo;
        if (tipo === 'laminado') {
            this.pedidoService.pedido.balcony.glass.laminated = true;
            this.pedidoService.pedido.balcony.glass.tempered = false;
            this.pedidoService.pedido.balcony.glass.laminatedTemperad = false;
            this.showDiv1 = true;
            this.showDiv2 = false;
        }
        else if (tipo === 'Temperado') {
            this.pedidoService.pedido.balcony.glass.laminated = false;
            this.pedidoService.pedido.balcony.glass.tempered = true;
            this.pedidoService.pedido.balcony.glass.laminatedTemperad = false;
            this.showDiv1 = true;
            this.showDiv2 = false;
        } else if (tipo === 'laminadoTemperado') {
            this.pedidoService.pedido.balcony.glass.laminated = false;
            this.pedidoService.pedido.balcony.glass.tempered = false;
            this.pedidoService.pedido.balcony.glass.laminatedTemperad = true;
            this.showDiv1 = false;
            this.showDiv2 = true;
        }
    }
    espessuraVidro(value: string) {
        if (value === '8mm') {
            this.pedidoService.pedido.balcony.glass.thickness['7mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['8mm'] = true;
            this.pedidoService.pedido.balcony.glass.thickness['9mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['10mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['11mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['12mm'] = false;

        } else if (value === '10mm') {
            this.pedidoService.pedido.balcony.glass.thickness['7mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['8mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['9mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['10mm'] = true;
            this.pedidoService.pedido.balcony.glass.thickness['11mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['12mm'] = false;
        } else if (value === '12mm') {
            this.pedidoService.pedido.balcony.glass.thickness['7mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['8mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['9mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['10mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['11mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['12mm'] = true;
        }
        else if (value === '7mm') {
            this.pedidoService.pedido.balcony.glass.thickness['7mm'] = true;
            this.pedidoService.pedido.balcony.glass.thickness['8mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['9mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['10mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['11mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['12mm'] = false;
        }
        else if (value === '9mm') {
            this.pedidoService.pedido.balcony.glass.thickness['7mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['8mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['9mm'] = true;
            this.pedidoService.pedido.balcony.glass.thickness['10mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['11mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['12mm'] = false;
        }
        else if (value === '11mm') {
            this.pedidoService.pedido.balcony.glass.thickness['7mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['8mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['9mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['10mm'] = false;
            this.pedidoService.pedido.balcony.glass.thickness['11mm'] = true;
            this.pedidoService.pedido.balcony.glass.thickness['12mm'] = false;
        }

    }

    changeCorVidro() {
        if (this.corDoVidro === 'Incolor') {
            this.pedidoService.pedido.balcony.glass.color.colorless = true;
            this.pedidoService.pedido.balcony.glass.color.bronze = false;
            this.pedidoService.pedido.balcony.glass.color.green = false;
            this.pedidoService.pedido.balcony.glass.color.tinted = false;
        } else if (this.corDoVidro === 'Verde') {
            this.pedidoService.pedido.balcony.glass.color.colorless = false;
            this.pedidoService.pedido.balcony.glass.color.bronze = false;
            this.pedidoService.pedido.balcony.glass.color.green = true;
            this.pedidoService.pedido.balcony.glass.color.tinted = false;
        } else if (this.corDoVidro === 'Fume') {
            this.pedidoService.pedido.balcony.glass.color.colorless = false;
            this.pedidoService.pedido.balcony.glass.color.bronze = false;
            this.pedidoService.pedido.balcony.glass.color.green = false;
            this.pedidoService.pedido.balcony.glass.color.tinted = true;
        } else if (this.corDoVidro === 'Bronze') {
            this.pedidoService.pedido.balcony.glass.color.colorless = false;
            this.pedidoService.pedido.balcony.glass.color.bronze = true;
            this.pedidoService.pedido.balcony.glass.color.green = false;
            this.pedidoService.pedido.balcony.glass.color.tinted = false;
        } else if (this.corDoVidro === 'Outro') {
            this.pedidoService.pedido.balcony.glass.color.colorless = false;
            this.pedidoService.pedido.balcony.glass.color.bronze = false;
            this.pedidoService.pedido.balcony.glass.color.green = false;
            this.pedidoService.pedido.balcony.glass.color.tinted = false;
        } else {
            this.pedidoService.pedido.balcony.glass.color.colorless = false;
            this.pedidoService.pedido.balcony.glass.color.bronze = false;
            this.pedidoService.pedido.balcony.glass.color.green = false;
            this.pedidoService.pedido.balcony.glass.color.tinted = false;
        }
    }

    verify() {
        if (this.pedidoService.pedido.balcony.glass.color.bronze)
            this.corDoVidro = 'Bronze';
        else if (this.pedidoService.pedido.balcony.glass.color.colorless)
            this.corDoVidro = 'Incolor';
        else if (this.pedidoService.pedido.balcony.glass.color.tinted)
            this.corDoVidro = 'Fume';
        else if (this.pedidoService.pedido.balcony.glass.color.green)
            this.corDoVidro = 'Verde';
        else if (this.pedidoService.pedido.balcony.glass.color.other)
            this.corDoVidro = 'Outro';
        else this.corDoVidro = '';
    }

    nextTab(): void {
        if (
            this.pedidoService.pedido.balcony.glass.tempered ||
            this.pedidoService.pedido.balcony.glass.laminated ||
            this.pedidoService.pedido.balcony.glass.laminatedTemperad
        ) {
            if (
                this.pedidoService.pedido.balcony.glass.color.colorless ||
                this.pedidoService.pedido.balcony.glass.color.bronze ||
                this.pedidoService.pedido.balcony.glass.color.green ||
                this.pedidoService.pedido.balcony.glass.color.tinted
            ) {
                if (
                    this.pedidoService.pedido.balcony.glass.thickness['8mm'] ||
                    this.pedidoService.pedido.balcony.glass.thickness['10mm'] ||
                    this.pedidoService.pedido.balcony.glass.thickness['12mm'] ||
                    this.pedidoService.pedido.balcony.glass.thickness['7mm'] ||
                    this.pedidoService.pedido.balcony.glass.thickness['9mm'] ||
                    this.pedidoService.pedido.balcony.glass.thickness['11mm']
                ) {
                    this.pedidoService.nextTab();
                } else this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
            } else if (this.pedidoService.pedido.balcony.glass.color.other) {
                this.pedidoService.nextTab();
            } else this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
        } else this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
