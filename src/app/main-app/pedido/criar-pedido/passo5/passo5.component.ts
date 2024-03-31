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
    amountPieces: number = 0
    
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
                this.selected = 'Outro';

            this.setSelectedOption();
        });

        if (this.pedidoService.pedido.balcony.dimensions.data.length > 0) {
            let novoData = this.pedidoService.pedido.balcony.dimensions.data[0];
            this.selectedOption = String(novoData);
        }
    }
    setSelectedOption() {
        this.options.forEach(option => {
            if (option.name === this.selected) {
                this.selectedOption = option.name;
            }
        });
    }

    toggleSelection(optionName: string): void {
        if (this.selectedOption === optionName) {
            return;
        }

        this.selectedOption = optionName;

        // Atualiza o formato do balcão com base na opção selecionada
        this.pedidoService.pedido.balcony.format = this.options.find(option => option.name === optionName)?.code || 0;

        // Limpa os dados relacionados ao formato do balcão
        this.pedidoService.pedido.balcony.dimensions.data = [];
        this.pedidoService.pedido.balcony.dimensions.total = '';
        // Notifica os observadores após qualquer mudança no formato do balcão
        this.pedidoService.notifyObservers();
    }


    // select(value: string, code: number) {
    //     this.pedidoService.pedido.balcony.format = code;
    //     this.pedidoService.pedido.balcony.dimensions.data = [];
    //     this.pedidoService.pedido.balcony.dimensions.total = '';
    //     this.selected = value;
    //     this.selectedOption[value] = true;
    //     this.pedidoService.notifyObservers();
    // }

    nextTab(): void {
        const obj = this.pedidoService.pedido.balcony.format;
        if (
            obj == 1 ||
            obj == 2 ||
            obj == 3 ||
            obj == 4
        ) {
            this.pedidoService.nextTab();
        } else this._toaster.warn(MESSAGES.UMA_OPCAO);
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
