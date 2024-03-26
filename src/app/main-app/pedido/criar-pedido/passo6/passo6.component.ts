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

    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) { }

    selected = '';
    selectedOptions: { [key: string]: boolean } = {};

    options: any[] = [
        {
            code: 'Dentro',
            name: 'Desalinhado para dentro',
            image: '../../../../../assets/img/6-distancia-guarda-corpo/desalinhado-dentro.jpg',
        },
        {
            code: 'Alinhado',
            name: 'Alinhado com o guarda corpo',
            image: '../../../../../assets/img/6-distancia-guarda-corpo/alinhado.jpg',
        },
        {
            code: 'Fora',
            name: 'Desalinhado para fora',
            image: '../../../../../assets/img/6-distancia-guarda-corpo/desalinhado-fora.jpg',
        },
    ];

    ngOnInit(): void {
        this.pedidoService.getObservable().subscribe(() => {
            if (this.pedidoService.pedido.balcony.beam.position.aligned)
                this.selected = 'Alinhado';
            if (this.pedidoService.pedido.balcony.beam.position.inside)
                this.selected = 'Dentro';
            if (this.pedidoService.pedido.balcony.beam.position.outside)
                this.selected = 'Fora';

            if (this.selectedOptions[this.selected] === undefined) {
                this.selectedOptions = {};
            }
        });
    }

    select(value: string) {
        this.pedidoService.pedido.balcony.beam.position.aligned =
            value === 'Alinhado';
        this.pedidoService.pedido.balcony.beam.position.inside =
            value === 'Dentro';
        this.pedidoService.pedido.balcony.beam.position.outside =
            value === 'Fora';
        this.selected = value;
        this.selectedOptions[value] = true;
    }

    toggleSelection(optionCode: string) {
        if (this.selected === optionCode) {
            console.log('Item selecionado:', optionCode);
            this.selectedOptions[optionCode] = !this.selectedOptions[optionCode];
        } else {
            this.selected = optionCode;
            this.selectedOptions = {};
            this.selectedOptions[optionCode] = true;
            this.pedidoService.pedido.balcony.format = this.options.find(option => option.code === optionCode)?.code;
            this.pedidoService.pedido.balcony.dimensions.data = [];
            this.pedidoService.pedido.balcony.dimensions.total = '';
            this.pedidoService.notifyObservers();
        }
    }

    nextTab(): void {
        const obj = this.pedidoService.pedido.balcony.beam.position;
        if (obj.aligned || obj.inside || obj.outside) {
            this.pedidoService.nextTab();
        } else this._toaster.warn(MESSAGES.UMA_OPCAO);
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
