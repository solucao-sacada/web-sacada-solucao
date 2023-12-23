import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo5',
    templateUrl: './passo5.component.html',
    styles: [],
})
export class Passo5Component {
    selected = '';
    options: any[] = [
        {
            code: 1,
            name: 'Reta',
            image: '../../../../../assets/img/5-formato-sacada/reta.jpg',
        },
        {
            code: 2,
            name: '"L" Esquerda',
            image: '../../../../../assets/img/5-formato-sacada/l-esquerda.jpg',
        },
        {
            code: 3,
            name: '"L" Direita',
            image: '../../../../../assets/img/5-formato-sacada/l-direita.jpg',
        },
        {
            code: 4,
            name: 'Formato "U"',
            image: '../../../../../assets/img/5-formato-sacada/u.jpg',
        },
        {
            code: 5,
            name: 'Outro',
            image: '',
        },
    ];
    constructor(private pedidoService: PedidoService) {}

    ngOnInit() {
        if (this.pedidoService.pedido.balcony.format == 1)
            this.selected = 'Reta';
        else if (this.pedidoService.pedido.balcony.format == 2)
            this.selected = '"L" Esquerda';
        else if (this.pedidoService.pedido.balcony.format == 3)
            this.selected = '"L" Direita';
        else if (this.pedidoService.pedido.balcony.format == 4)
            this.selected = 'Formato "U"';
        else this.selected = 'Outro';
    }

    select(value: string, code: number) {
        this.pedidoService.pedido.balcony.format = code !== 5 ? code : '';
        this.pedidoService.pedido.balcony.dimensions.data = [];
        this.pedidoService.pedido.balcony.dimensions.total = '';
        this.selected = value;
        this.pedidoService.notifyObservers();
    }
}
