import { Component, Input, OnInit } from '@angular/core';
import { MESSAGES } from 'src/app/admin/utils/messages';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { Pedido } from 'src/app/models/pedido';
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
            name: 'Normal',
            image: '../../../../../assets/img/7-trilhos-superiores/normal.jpg',
        },
        {
            name: 'Chapa de correção para fora',
            image: '../../../../../assets/img/7-trilhos-superiores/aba-fora.jpg',
        },
        {
            name: 'Chapa de correção para dentro',
            image: '../../../../../assets/img/7-trilhos-superiores/aba-dentro.jpg',
        },
    ];

    ngOnInit(): void {
        if (this.pedidoService.pedido.balcony.rails.upper_rail.tip.normal)
            this.selected = 'Normal';
        if (this.pedidoService.pedido.balcony.rails.upper_rail.tab.inside)
            this.selected = 'Chapa de correção para dentro';
        if (this.pedidoService.pedido.balcony.rails.upper_rail.tab.outside)
            this.selected = 'Chapa de correção para fora';
    }

    select(value: string) {
        if (value === 'Normal') {
            this.pedidoService.pedido.balcony.rails.upper_rail.tip.normal =
                true;
            this.pedidoService.pedido.balcony.rails.upper_rail.tip.tab = false;
            this.pedidoService.pedido.balcony.rails.upper_rail.tab.inside =
                false;
            this.pedidoService.pedido.balcony.rails.upper_rail.tab.outside =
                false;
        } else if (value === 'Chapa de correção para fora') {
            this.pedidoService.pedido.balcony.rails.upper_rail.tip.normal =
                false;
            this.pedidoService.pedido.balcony.rails.upper_rail.tip.tab = true;
            this.pedidoService.pedido.balcony.rails.upper_rail.tab.outside =
                true;
            this.pedidoService.pedido.balcony.rails.upper_rail.tab.inside =
                false;
        } else {
            this.pedidoService.pedido.balcony.rails.upper_rail.tip.normal =
                false;
            this.pedidoService.pedido.balcony.rails.upper_rail.tip.tab = true;
            this.pedidoService.pedido.balcony.rails.upper_rail.tab.outside =
                false;
            this.pedidoService.pedido.balcony.rails.upper_rail.tab.inside =
                true;
        }
        this.selected = value;
    }

    nextTab(): void {
        const obj = this.pedidoService.pedido.balcony.rails.upper_rail;
        if (
            obj.tip.normal ||
            obj.tip.tab ||
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
