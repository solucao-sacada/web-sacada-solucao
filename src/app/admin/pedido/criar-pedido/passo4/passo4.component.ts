import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';

@Component({
    selector: 'app-passo4',
    templateUrl: './passo4.component.html',
    styles: [],
})
export class Passo4Component {
    @Input() pedido: Pedido;

    cores: string[] = [
        'Branco',
        'Preto',
        'BZ1001',
        'BZ1002',
        'BZ1003',
        'Nat. Fosco',
        'Outro',
    ];

    alterarCor(value: string): void {
        this.pedido.passo4.cor_aluminio = value;
    }
}
