import { Component } from '@angular/core';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { MESSAGES } from 'src/app/main-app/utils/messages';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo8',
    templateUrl: './passo8.component.html',
})
export class Passo8Component {
    normalOptions = [
        { code: 'A', label: 'A - Dentro' },
        { code: 'B', label: 'B - Centro' },
        { code: 'C', label: 'C - Fora' },
        { code: 'other', label: 'Outro' },
    ];
    // ABA CHAPA PARA DENTRO
    tabOptionsInside = [
        { code: 'A', label: 'A - DENTRO DO CONJUNTO INFERIOR' },
        { code: 'B', label: 'B - CENTRO ABA FIXAÇÃO' },
        { code: 'C', label: 'C - DENTRO DO TRILHO INFERIOR' },
        { code: 'D', label: 'D - CENTRO DO TRILHO INFERIOR' },
        { code: 'E', label: 'E - FORA DO CONJUNTO' },
    ];

    // ABA CHAPA PARA FORA
    tabOptionsOutside = [
        { code: 'A', label: 'A - DENTRO DO CONJUNTO INFERIOR' },
        { code: 'B', label: 'B - CENTRO DO TRILHO INFERIOR' },
        { code: 'C', label: 'C - DENTRO DO TRILHO INFERIOR' },
        { code: 'D', label: 'D - CENTRO ABA FIXAÇÃO' },
        { code: 'E', label: 'E - FORA DO CONJUNTO INFERIOR' },
    ];


    selected;
    normalOption;
    tabOption;
    builtInRefOption;
    selectedOption!: string;

    options1 = [
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

    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) { }

    ngOnInit(): void {
        this.pedidoService.getObservable().subscribe(() => {
            this.updateValuesFromRails();
            this.selectedOption = this.pedidoService.pedido?.balcony?.rails?.lower_rail?.normal?.tip.other ? 'other' : '';
        });
    }


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
        this.pedidoService.pedido.balcony.rails.lower_rail.normal.tip.A =
            value === 'A';
        this.pedidoService.pedido.balcony.rails.lower_rail.normal.tip.B =
            value === 'B';
        this.pedidoService.pedido.balcony.rails.lower_rail.normal.tip.C =
            value === 'C';
        if (value === 'other') {
            this.pedidoService.pedido.balcony.rails.lower_rail.normal.tip.other = '';
        } else {
            this.pedidoService.pedido.balcony.rails.lower_rail.normal.tip.other = undefined;
        }
        this.normalOption = value;
    }

    changeTabOption(value: any) {
        this.pedidoService.pedido.balcony.rails.lower_rail.tab.tip.A =
            value === 'A';
        this.pedidoService.pedido.balcony.rails.lower_rail.tab.tip.B =
            value === 'B';
        this.pedidoService.pedido.balcony.rails.lower_rail.tab.tip.C =
            value === 'C';
        this.pedidoService.pedido.balcony.rails.lower_rail.tab.tip.D =
            value === 'D';
        this.pedidoService.pedido.balcony.rails.lower_rail.tab.tip.E =
            value === 'E';
    }

    changeBuiltInOption(value: any) {
        this.pedidoService.pedido.balcony.rails.lower_rail.built_in.ref.A =
            value === 'A';
        this.pedidoService.pedido.balcony.rails.lower_rail.built_in.ref.B =
            value === 'B';
        this.pedidoService.pedido.balcony.rails.lower_rail.built_in.ref.C =
            value === 'C';
        this.pedidoService.pedido.balcony.rails.lower_rail.built_in.ref.other =
            value === 'other';
    }

    private updateValuesFromRails(): void {
        const rails = this.pedidoService.pedido.balcony.rails;

        this.updateSelectedFromRails(rails);
        this.updateNormalOptionFromRails(rails);
        this.updateTabOptionFromRails(rails);
        this.updateBuiltInRefOptionFromRails(rails);
    }

    private updateSelectedFromRails(rails: any): void {
        // Exemplo de lógica: Definir this.selected com base no valor de algum campo em rails
        this.selected = rails.lower_rail.built_in.tip.A
            ? 'A'
            : rails.lower_rail.built_in.tip.B
                ? 'B'
                : rails.lower_rail.built_in.tip.C
                    ? 'C'
                    : rails.lower_rail.built_in.tip.D
                        ? 'D'
                        : null; // Adapte conforme sua estrutura real
    }

    private updateBuiltInRefOptionFromRails(rails: any): void {
        // Exemplo de lógica: Definir this.selected com base no valor de algum campo em rails
        this.builtInRefOption = rails.lower_rail.built_in.ref.A
            ? 'A'
            : rails.lower_rail.built_in.ref.B
                ? 'B'
                : rails.lower_rail.built_in.ref.C
                    ? 'C'
                    : rails.lower_rail.built_in.ref.other
                        ? 'other'
                        : null; // Adapte conforme sua estrutura real
    }

    private updateNormalOptionFromRails(rails: any): void {
        // Exemplo de lógica: Definir this.normalOption com base no valor de algum campo em rails
        this.normalOption = rails.lower_rail.normal.tip.A
            ? 'A'
            : rails.lower_rail.normal.tip.B
                ? 'B'
                : rails.lower_rail.normal.tip.C
                    ? 'C'
                    : rails.lower_rail.normal.tip.other
                        ? 'other'
                        : false
    }

    private updateTabOptionFromRails(rails: any): void {
        // Exemplo de lógica: Definir this.tabOption com base no valor de algum campo em rails
        this.tabOption = rails.lower_rail.tab.tip.A
            ? 'A'
            : rails.lower_rail.tab.tip.B
                ? 'B'
                : rails.lower_rail.tab.tip.C
                    ? 'C'
                    : rails.lower_rail.tab.tip.D
                        ? 'D'
                        : rails.lower_rail.tab.tip.E
                            ? 'E'
                            : null; // Adapte conforme sua estrutura real
    }

    nextTab(): void {
        const rails = this.pedidoService.pedido.balcony.rails.lower_rail;
        if (rails.tip.built_in || rails.tip.normal || rails.tip.tab) {
            if (rails.tip.normal) {
                if (
                    rails.normal.tip.A ||
                    rails.normal.tip.B ||
                    rails.normal.tip.C ||
                    rails.normal.tip.other
                ) {
                    this.pedidoService.nextTab();
                } else {
                    this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
                }
            } else if (rails.tip.built_in) {
                if (
                    rails.built_in.tip.A ||
                    rails.built_in.tip.B ||
                    rails.built_in.tip.C ||
                    rails.built_in.tip.D
                )
                if (
                    (rails.built_in.tip.A ||
                        rails.built_in.tip.B ||
                        rails.built_in.tip.C ||
                        rails.built_in.tip.D) &&
                    (rails.built_in.ref.A ||
                        rails.built_in.ref.B ||
                        rails.built_in.ref.C ||
                        rails.built_in.ref.other)
                ) {
                    this.pedidoService.nextTab();
                } else {
                    this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
                }
            } else if (rails.tip.tab) {
                if (rails.tab.inside || rails.tab.outside) {
                    if (
                        rails.tab.tip.A ||
                        rails.tab.tip.B ||
                        rails.tab.tip.C ||
                        rails.tab.tip.D ||
                        rails.tab.tip.E
                    ) {
                        // this.pedidoService.saveDraftPedido(this.pedidoService.pedido);
                        this.pedidoService.nextTab();
                    } else {
                        this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
                    }
                } else {
                    this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
                }
            }
        } else {
            this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
        }
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
