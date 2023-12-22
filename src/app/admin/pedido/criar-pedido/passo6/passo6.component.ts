import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo6',
    templateUrl: './passo6.component.html',
    styles: [],
})
export class Passo6Component implements OnInit {
    @Input() pedido: Pedido;

    constructor(public pedidoService: PedidoService) {}

    selected = '';
    options: any[] = [
        {
            name: 'Dentro',
            image: '../../../../../assets/img/6-distancia-guarda-corpo/desalinhado-dentro.jpg',
        },
        {
            name: 'Alinhado',
            image: '../../../../../assets/img/6-distancia-guarda-corpo/alinhado.jpg',
        },
        {
            name: 'Fora',
            image: '../../../../../assets/img/6-distancia-guarda-corpo/desalinhado-fora.jpg',
        },
    ];

    ngOnInit(): void {
        if (this.pedidoService.pedido.balcony.beam.position.aligned)
            this.selected = 'Alinhado';
        if (this.pedidoService.pedido.balcony.beam.position.inside)
            this.selected = 'Dentro';
        if (this.pedidoService.pedido.balcony.beam.position.outside)
            this.selected = 'Fora';
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
}
