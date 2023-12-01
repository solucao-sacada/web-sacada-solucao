import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';

@Component({
    selector: 'app-passo6',
    templateUrl: './passo6.component.html',
    styles: [],
})
export class Passo6Component {
    @Input() pedido: Pedido;

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

    select(value: string) {
        this.pedido.passo6.alinhamento_viga = value;
        this.selected = value;
    }
}
