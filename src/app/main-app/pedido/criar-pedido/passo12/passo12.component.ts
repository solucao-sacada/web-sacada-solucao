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

    selected = '';

    ngOnInit() {
        this.pedidoService.getObservable().subscribe(() => {
            if (this.pedidoService.pedido.balcony.aperture.inside)
                this.selected = 'Para Dentro';
            if (this.pedidoService.pedido.balcony.aperture.outside)
                this.selected = 'Para Fora';
        });
    }

    constructor(public pedidoService: PedidoService) {}

    select(option: any) {
        this.pedidoService.pedido.balcony.aperture.inside = option.code === 1;
        this.pedidoService.pedido.balcony.aperture.outside = option.code === 2;
        this.selected = option.name;
    }

    nextTab(): void {
        this.pedidoService.nextTab();
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
