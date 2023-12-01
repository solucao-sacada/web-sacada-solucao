import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';

@Component({
    selector: 'app-passo5',
    templateUrl: './passo5.component.html',
    styles: [],
})
export class Passo5Component {
    @Input() pedido: Pedido;

    selected = '';
    options: any[] = [
        {
            name: 'Reta',
            image: '../../../../../assets/img/5-formato-sacada/reta.jpg',
        },
        {
            name: '"L" Esquerda',
            image: '../../../../../assets/img/5-formato-sacada/l-esquerda.jpg',
        },
        {
            name: '"L" Direita',
            image: '../../../../../assets/img/5-formato-sacada/l-direita.jpg',
        },
        {
            name: 'Formato "U"',
            image: '../../../../../assets/img/5-formato-sacada/u.jpg',
        },
        {
            name: 'Outro',
            image: '',
        },
    ];

    select(value: string) {
        this.pedido.passo5.formato_sacada = value;
        this.selected = value;
    }
}
