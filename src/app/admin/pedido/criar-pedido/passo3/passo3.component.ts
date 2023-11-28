import { Component, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Pedido } from 'src/app/models/pedido';

@Component({
    selector: 'app-passo3',
    templateUrl: './passo3.component.html',
    styles: [],
})
export class Passo3Component {
    @Input() pedido: Pedido;
    coresDoVidro: SelectItem<string>[] = [
        {
            label: 'Incolor',
            value: 'Incolor',
        },
        {
            label: 'Verde',
            value: 'Verde',
        },
        {
            label: 'Fumê',
            value: 'Fume',
        },
        {
            label: 'Bronze',
            value: 'Bronze',
        },
        {
            label: 'Outro',
            value: 'Outro',
        },
    ];

    tipoVidro(value: string) {
        this.pedido.passo3.tipo_vidro = value;
    }

    espessuraVidro(value: string) {
        this.pedido.passo3.espessura_vidro = value;
    }
}
