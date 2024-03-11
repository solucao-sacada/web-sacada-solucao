import { Component, Input } from '@angular/core';
import { MESSAGES } from 'src/app/main-app/utils/messages';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { Pedido } from 'src/app/models/pedido';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo5',
    templateUrl: './passo5.component.html',
    styles: [],
})
export class Passo5Component {
    selected = '';
    options: any[] = [
        {
            code: 1,
            name: 'Reta',
            image: '../../../../../assets/img/5-formato-sacada/reta.jpg',
        },
        {
            code: 2,
            name: '"L" Esquerda',
            image: '../../../../../assets/img/5-formato-sacada/l-esquerda.jpg',
        },
        {
            code: 3,
            name: '"L" Direita',
            image: '../../../../../assets/img/5-formato-sacada/l-direita.jpg',
        },
        {
            code: 4,
            name: 'Formato "U"',
            image: '../../../../../assets/img/5-formato-sacada/u.jpg',
        },
        {
            code: 5,
            name: 'Outro',
            image: '',
        },
    ];
    constructor(
        private pedidoService: PedidoService,
        private _toaster: ToasterService
    ) {}

    ngOnInit() {
        this.pedidoService.getObservable().subscribe(() => {
            if (this.pedidoService.pedido.balcony.format == 0)
                this.selected = '';
            else if (this.pedidoService.pedido.balcony.format == 1)
                this.selected = 'Reta';
            else if (this.pedidoService.pedido.balcony.format == 2)
                this.selected = '"L" Esquerda';
            else if (this.pedidoService.pedido.balcony.format == 3)
                this.selected = '"L" Direita';
            else if (this.pedidoService.pedido.balcony.format == 4)
            this.selected = 'Formato "U"';
            else if (this.pedidoService.pedido.balcony.format == 5)
            this.selected = 'Formato "Outro"';
            // else this.selected = 'Outro';
        });
    }

    select(value: string, code: number) {
        this.pedidoService.pedido.balcony.format = code;
        this.pedidoService.pedido.balcony.dimensions.data = [];
        this.pedidoService.pedido.balcony.dimensions.total = '';
        this.selected = value;
        this.pedidoService.notifyObservers();
    }

    nextTab(): void {
        if (
            this.pedidoService.pedido.balcony.format ||
            this.selected === 'Outro'
        ) {
            if (this.selected === 'Outro') {
                if (this.pedidoService.pedido.balcony.format) {
                    this.pedidoService.nextTab();
                } else this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
            } else this.pedidoService.nextTab();
        } else this._toaster.warn(MESSAGES.UMA_OPCAO);
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
