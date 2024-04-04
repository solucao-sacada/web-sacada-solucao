import { Component, Input, OnInit } from '@angular/core';
import { MESSAGES } from 'src/app/main-app/utils/messages';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo6',
    templateUrl: './passo6.component.html',
    styles: [],
})
export class Passo6Component implements OnInit {
    @Input() pedido: Pedido;

    selected = '';
    selectedOption = '';

    options: any[] = [
        {
            code: 1,
            name: 'Chapa de correção para fora',
            image: '../../../../../assets/img/6-distancia-guarda-corpo/desalinhado-dentro.jpg',
        },
        {
            code: 2,
            name: 'Alinhado com o guarda corpo',
            image: '../../../../../assets/img/6-distancia-guarda-corpo/alinhado.jpg',
        },
        {
            code: 3,
            name: 'Chapa de correção para dentro',
            image: '../../../../../assets/img/6-distancia-guarda-corpo/desalinhado-fora.jpg',
        },
    ];

    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) { }

    ngOnInit() {
        this.pedidoService.getObservable().subscribe(() => {
            this.setSelectedFromPosition();
        });
    }


    setSelectedFromPosition() {
        const position = this.pedidoService.pedido.balcony.beam.position;
        if (position) {
            if (position.aligned) {
                this.selected = 'Alinhado com o guarda corpo';
            } else if (position.inside) {
                this.selected = 'Chapa de correção para dentro';
            } else if (position.outside) {
                this.selected = 'Chapa de correção para fora';
            }
            this.setSelectedOption();
        }
    }

    setSelectedOption() {
        this.selectedOption = this.selected;
    }

    toggleSelection(optionName: string): void {
        if (this.selectedOption === optionName) {
            return;
        }

        this.selectedOption = optionName;

        // Atualiza a posição do feixe com base na opção selecionada
        const selectedOption = this.options.find(option => option.name === optionName);
        if (selectedOption) {
            const position = this.pedidoService.pedido.balcony.beam.position;
            position.aligned = selectedOption.code === 2;
            position.inside = selectedOption.code === 3;
            position.outside = selectedOption.code === 1;
        }

        // Limpa os dados relacionados ao formato do balcão
        this.pedidoService.pedido.balcony.dimensions.data = [];
        this.pedidoService.pedido.balcony.dimensions.total = '';

        // Notifica os observadores após qualquer mudança no formato do balcão
        this.pedidoService.notifyObservers();
    }

    nextTab(): void {
        const position = this.pedidoService.pedido.balcony.beam.position;

        if (position && (position.aligned || position.inside || position.outside)) {
            this.pedidoService.nextTab();
        } else {
            this._toaster.warn(MESSAGES.UMA_OPCAO);
        }
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }


    // select(value: string, code: number) {
    //     this.pedidoService.pedido.balcony.format = code;
    //     this.pedidoService.pedido.balcony.dimensions.data = [];
    //     this.pedidoService.pedido.balcony.dimensions.total = '';
    //     this.selected = value;
    //     this.selectedOption[value] = true;
    //     this.pedidoService.notifyObservers();
    // }


    // nextTab(): void {
    //     const position = this.pedidoService.pedido.balcony.beam.position;

    //     if (
    //         position == 1 ||
    //         position == 2 ||
    //         position == 3
    //         ) {
    //             this.pedidoService.nextTab();
    //     } else {
    //         this._toaster.warn(MESSAGES.UMA_OPCAO);
    //     }

    // }


}
