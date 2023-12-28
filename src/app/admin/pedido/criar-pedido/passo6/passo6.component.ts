import { Component, Input, OnInit } from '@angular/core';
import { MESSAGES } from 'src/app/admin/utils/messages';
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
    ) {}

    selected = '';
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
