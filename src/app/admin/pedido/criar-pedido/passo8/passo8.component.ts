import { Component, Input } from '@angular/core';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo8',
    templateUrl: './passo8.component.html',
})
export class Passo8Component {
    normalOptions = [
        { code: 'A', label: 'A' },
        { code: 'B', label: 'B' },
        { code: 'C', label: 'C' },
        { code: 'other', label: 'Outro' },
    ];
    tabOptions = [
        { code: 'A', label: 'A' },
        { code: 'B', label: 'B' },
        { code: 'C', label: 'C' },
        { code: 'D', label: 'D' },
        { code: 'E', label: 'E' },
    ];

    selected;

    options = [
        {
            code: 'A',
            name: 'A - Sobre o piso pronto',
            image: '../../../../../assets/img/8-trilhos-inferiores/dentro.jpg',
        },
        {
            code: 'B',
            name: 'B - Dentro da calha',
            image: '../../../../../assets/img/8-trilhos-inferiores/dentro.jpg',
        },
        {
            code: 'C',
            name: 'C - Sobre o piso pronto',
            image: '../../../../../assets/img/8-trilhos-inferiores/dentro-degrau.jpg',
        },
        {
            code: 'D',
            name: 'D - Dentro da calha',
            image: '../../../../../assets/img/8-trilhos-inferiores/dentro-degrau.jpg',
        },
    ];

    constructor(public pedidoService: PedidoService) {}

    select(value: string) {
        this.selected = value;
        this.pedidoService.pedido.balcony.rails.lower_rail.built_in.tip.A =
            value === 'A';
        this.pedidoService.pedido.balcony.rails.lower_rail.built_in.tip.B =
            value === 'B';
        this.pedidoService.pedido.balcony.rails.lower_rail.built_in.tip.C =
            value === 'C';
        this.pedidoService.pedido.balcony.rails.lower_rail.built_in.tip.D =
            value === 'D';
        console.log(
            this.pedidoService.pedido.balcony.rails.lower_rail.built_in
        );
    }

    changeTip(value: string) {
        this.pedidoService.pedido.balcony.rails.lower_rail.tip.built_in =
            value === 'built_in';
        this.pedidoService.pedido.balcony.rails.lower_rail.tip.normal =
            value === 'normal';
        this.pedidoService.pedido.balcony.rails.lower_rail.tip.tab =
            value === 'tab';
    }

    changeTab(value: string) {
        this.pedidoService.pedido.balcony.rails.lower_rail.tab.inside =
            value === 'inside';
        this.pedidoService.pedido.balcony.rails.lower_rail.tab.outside =
            value === 'outside';
    }

    changeNormalOption(value: any) {
        console.log(value);
        this.pedidoService.pedido.balcony.rails.lower_rail.normal.tip.A =
            value === 'A';
        this.pedidoService.pedido.balcony.rails.lower_rail.normal.tip.B =
            value === 'B';
        this.pedidoService.pedido.balcony.rails.lower_rail.normal.tip.C =
            value === 'C';
        this.pedidoService.pedido.balcony.rails.lower_rail.normal.tip.other =
            value === 'other';
        console.log(this.pedidoService.pedido.balcony.rails.lower_rail.normal);
    }
    changeBuiltInOption(value: any) {
        console.log(value);
        this.pedidoService.pedido.balcony.rails.lower_rail.built_in.ref.A =
            value === 'A';
        this.pedidoService.pedido.balcony.rails.lower_rail.built_in.ref.B =
            value === 'B';
        this.pedidoService.pedido.balcony.rails.lower_rail.built_in.ref.C =
            value === 'C';
        this.pedidoService.pedido.balcony.rails.lower_rail.built_in.ref.other =
            value === 'other';
        console.log(
            this.pedidoService.pedido.balcony.rails.lower_rail.built_in.ref
        );
    }
}
