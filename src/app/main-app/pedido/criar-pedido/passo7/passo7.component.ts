import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { MESSAGES } from 'src/app/main-app/utils/messages';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo7',
    templateUrl: './passo7.component.html',
    styles: [],
})
export class Passo7Component implements OnInit {
    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) {}

    selected = '';
    options: any[] = [
        {
            name: 'Chapa de correção para fora',
            image: '../../../../../assets/img/7-trilhos-superiores/aba-fora.jpg',
        },

        {
            name: 'Normal',
            image: '../../../../../assets/img/7-trilhos-superiores/normal.jpg',
        },

        {
            name: 'Chapa de correção para dentro',
            image: '../../../../../assets/img/7-trilhos-superiores/aba-dentro.jpg',
        },


    ];

    ngOnInit(): void {
        this.pedidoService.getObservable().subscribe(() => {
            if (this.pedidoService.pedido.balcony.rails.upper_rail.tip.normal)
                this.selected = 'Normal';
            if (this.pedidoService.pedido.balcony.rails.upper_rail.tab.inside)
                this.selected = 'Chapa de correção para dentro';
            if (this.pedidoService.pedido.balcony.rails.upper_rail.tab.outside)
                this.selected = 'Chapa de correção para fora';
        });
    }

    toggleSelection(optionName: string): void {
        if (this.selected === optionName) {
            return;
        }

        const selectedOption = this.options.find(option => option.name === optionName);

        if (selectedOption) {
            const rail = this.pedidoService.pedido.balcony.rails.upper_rail;

            if (optionName === 'Chapa de correção para dentro') {
                rail.tab.inside = true;
                rail.tab.outside = false;
            } else if (optionName === 'Chapa de correção para fora') {
                rail.tab.inside = false;
                rail.tab.outside = true;
            } else if (optionName === 'Normal') {
                rail.tip.normal = true;
                rail.tab.outside = false;
                rail.tab.inside = false;
            }

            this.selected = optionName;
            this.pedidoService.notifyObservers();
        }
    }


    nextTab(): void {
        const obj = this.pedidoService.pedido.balcony.rails.upper_rail;
        if (
            obj.tip.normal ||
            obj.tab.inside ||
            obj.tab.outside
        ) {
            this.pedidoService.nextTab();
        } else this._toaster.warn(MESSAGES.UMA_OPCAO);
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
