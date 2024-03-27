import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo5',
    templateUrl: './passo5.component.html',
    styleUrls: []
})
export class Passo5Component implements OnInit {

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
        private toasterService: ToasterService
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
            
            this.toggleSelection(this.selected);
        });
    
        if (this.pedidoService.pedido.balcony.dimensions.data.length > 0){
            let newData = this.pedidoService.pedido.balcony.dimensions.data[0];
            this.selectedOption = String(newData);
        }
    }
    
    

    toggleSelection(optionName: string) {
        if (this.selectedOption === optionName) {
            return;
        }

        this.selectedOption = optionName;
        this.pedidoService.pedido.balcony.format = this.options.find(option => option.name === optionName)?.code || 0;
        this.pedidoService.pedido.balcony.dimensions.data = [];
        this.pedidoService.pedido.balcony.dimensions.total = '';
        this.pedidoService.notifyObservers();
    }

    select(value: string, code: number) {
        this.selectedOption = value;
        this.pedidoService.pedido.balcony.format = code;
        this.pedidoService.pedido.balcony.dimensions.data = [];
        this.pedidoService.pedido.balcony.dimensions.total = '';
        this.pedidoService.notifyObservers();
    }

    nextTab(): void {
        if (
            this.pedidoService.pedido.balcony.format ||
            this.selectedOption === 'Outro'
        ) {
            if (this.selectedOption === 'Outro') {
                this.pedidoService.pedido.balcony.format = this.amountPieces;

                if (this.pedidoService.pedido.balcony.format) {
                    this.pedidoService.nextTab();
                } else {
                    this.toasterService.warn('Campos obrigatórios não preenchidos.');
                }
            } else {
                this.pedidoService.nextTab();
            }
        } else {
            this.toasterService.warn('Selecione uma opção.');
        }
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
