import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo12',
    templateUrl: './passo12.component.html',
    styles: [],
})
export class Passo12Component implements OnInit {
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
    selectedOption = '';

    ngOnInit() {
        this.pedidoService.getObservable().subscribe((data) => {
            if (this.pedidoService.pedido.balcony.aperture.inside){
                this.selected = 'Para Dentro';
                this.selectedOption = 'Para Dentro';
                return
            }

            if (this.pedidoService.pedido.balcony.aperture.outside){
                this.selected = 'Para Fora';
                this.selectedOption = 'Para Fora';
            }

        });
    }

    constructor(public pedidoService: PedidoService) {}

    toggleSelection(optionName: string): void {
        this.selectedOption = optionName;
        this.selected = optionName;

        if(optionName.includes('Para Dentro')){
            this.pedidoService.pedido.balcony.aperture.inside = true;
            this.pedidoService.pedido.balcony.aperture.outside = false;
        }else if(optionName.includes('Para Fora')){
            this.pedidoService.pedido.balcony.aperture.outside = true;
            this.pedidoService.pedido.balcony.aperture.inside = false;
        }
    }
//
    nextTab(): void {
        this.pedidoService.nextTab();
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }


}
