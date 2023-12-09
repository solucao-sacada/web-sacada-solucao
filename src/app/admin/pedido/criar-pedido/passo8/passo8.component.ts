import { Component, Input } from '@angular/core';
import { PedidoJson } from 'src/app/models/pedidoJson';

@Component({
    selector: 'app-passo8',
    templateUrl: './passo8.component.html',
})
export class Passo8Component {
    @Input() pedido: PedidoJson;
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

    select(value: string) {
        this.selected = value;
        this.pedido.balcony.rails.lower_rail.built_in.tip.A = value === 'A';
        this.pedido.balcony.rails.lower_rail.built_in.tip.B = value === 'B';
        this.pedido.balcony.rails.lower_rail.built_in.tip.C = value === 'C';
        this.pedido.balcony.rails.lower_rail.built_in.tip.D = value === 'D';
        console.log(this.pedido.balcony.rails.lower_rail.built_in);
    }

    changeTip(value: string) {
        this.pedido.balcony.rails.lower_rail.tip.built_in =
            value === 'built_in';
        this.pedido.balcony.rails.lower_rail.tip.normal = value === 'normal';
        this.pedido.balcony.rails.lower_rail.tip.tab = value === 'tab';
    }
    changeTab(value: string) {
        this.pedido.balcony.rails.lower_rail.tab.inside = value === 'inside';
        this.pedido.balcony.rails.lower_rail.tab.outside = value === 'outside';
    }

    normalOption: any = 'A';

    changeNormalOption(value: any) {
        console.log(value);
        this.pedido.balcony.rails.lower_rail.normal.tip.A = value === 'A';
        this.pedido.balcony.rails.lower_rail.normal.tip.B = value === 'B';
        this.pedido.balcony.rails.lower_rail.normal.tip.C = value === 'C';
        this.pedido.balcony.rails.lower_rail.normal.tip.other =
            value === 'other';
        console.log(this.pedido.balcony.rails.lower_rail.normal);
    }
    changeBuiltInOption(value: any) {
        console.log(value);
        this.pedido.balcony.rails.lower_rail.built_in.ref.A = value === 'A';
        this.pedido.balcony.rails.lower_rail.built_in.ref.B = value === 'B';
        this.pedido.balcony.rails.lower_rail.built_in.ref.C = value === 'C';
        this.pedido.balcony.rails.lower_rail.built_in.ref.other =
            value === 'other';
        console.log(this.pedido.balcony.rails.lower_rail.built_in.ref);
    }
}
