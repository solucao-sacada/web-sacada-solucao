import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';

@Component({
    selector: 'app-passo7',
    templateUrl: './passo7.component.html',
    styles: [],
})
export class Passo7Component {
    @Input() pedido: Pedido;

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

    select(value: string) {
        this.pedido.passo7.tipo_aba = value;
        this.selected = value;
    }
}
