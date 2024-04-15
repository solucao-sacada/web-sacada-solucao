import { Component, Input } from '@angular/core';
import { MESSAGES } from 'src/app/main-app/utils/messages';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
    selector: 'app-passo5',
    templateUrl: './passo5.component.html',
    styles: [],
})
export class Passo5Component {
    @Input() pedido: Pedido;

    selected = '';
    selectedOption = '';
    amountPieces: number = 0;

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
    ) { }

    ngOnInit() {
        if (this.pedidoService.pedido.balcony.format == 0)
            this.selectedOption = '';
        else if (this.pedidoService.pedido.balcony.format == 1)
            this.selectedOption = 'Reta';
        else if (this.pedidoService.pedido.balcony.format == 2)
            this.selectedOption = '"L" Esquerda';
        else if (this.pedidoService.pedido.balcony.format == 3)
            this.selectedOption = '"L" Direita';
        else if (this.pedidoService.pedido.balcony.format == 4)
            this.selectedOption = 'Formato "U"';
        else if (this.pedidoService.pedido.balcony.format == 5) {
            this.selectedOption = 'Outro';
        }

        if (this.pedidoService.pedido.balcony.dimensions.data.length > 0) {
            let novoData = this.pedidoService.pedido.balcony.dimensions.data[0];
            this.selectedOption = String(novoData);
        }
    }
    toggleSelection(optionName: string): void {
        this.selectedOption = optionName;

        switch (optionName) {
            case 'Formato "U"':
                this.pedidoService.pedido.balcony.format = 3;
                break;
            case '"L" Esquerda':
            case '"L" Direita':
                this.pedidoService.pedido.balcony.format = 2;
                break;
            case 'Reta':
                this.pedidoService.pedido.balcony.format = 1;
                break;
            case 'Outro':
                this.pedidoService.pedido.balcony.format = 0;
                break;
        }

        this.pedidoService.pedido.balcony.dimensions.data = [];
        this.pedidoService.pedido.balcony.dimensions.total = '';

        this.pedidoService.notifyObservers();
    }


    onAmountPiecesChange(): void {
        // Quando o valor do input muda, atribuímos o novo valor ao formato do pedido
        this.pedidoService.pedido.balcony.format = this.amountPieces;
    }

    nextTab(): void {
        const obj = this.pedidoService.pedido.balcony.format;

        if (obj === 0) {
            this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
            return;
        }

        if (
            obj == 1 ||
            obj == 2 ||
            obj == 3 ||
            obj == 4
        ) {
            this.pedidoService.nextTab();
        } else if (obj >= 5) {
            if (this.amountPieces <= 0) {
                this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
                return;
            }
            this.pedidoService.pedido.balcony.format = this.amountPieces;
            this.pedidoService.nextTab();
        }
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
