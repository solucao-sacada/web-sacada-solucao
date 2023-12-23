import { Component } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo12',
    templateUrl: './passo12.component.html',
    styles: [],
})
export class Passo12Component {
    options: any[] = [
        {
            code: 1,
            name: 'Para Dentro',
            image: '../../../../../assets/img/11-aberturas/dentro.jpeg',
        },
        {
            code: 2,
            name: 'Para Fora',
            image: '../../../../../assets/img/11-aberturas/fora.jpeg',
        },
    ];

    selected: string = this.pedidoService.pedido.balcony.aperture.inside
        ? 'Para Dentro'
        : 'Para Fora';

    constructor(public pedidoService: PedidoService) {}

    select(option: any) {
        this.pedidoService.pedido.balcony.aperture.inside = option.code === 1;
        this.pedidoService.pedido.balcony.aperture.outside = option.code === 2;
        this.selected = option.name;
    }
}
