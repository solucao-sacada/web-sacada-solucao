import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MESSAGES } from 'src/app/main-app/utils/messages';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo11',
    templateUrl: './passo11.component.html',
    styles: [],
})
export class Passo11Component {
    // @ViewChild('inputElement') inputElement: ElementRef;
    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) {}

    difference = '';

    visible = false;

    ngOnInit(): void {
        this.pedidoService.getObservable().subscribe(() => {
            this.openOverlay();
        });
    }

    // ngAfterViewInit() {
    //   }

    //   setCursorToEnd() {
    //     const input = this.inputElement.nativeElement;
    //     input.focus();
    //     const value = input.value;
    //     input.value = '';
    //     input.value = value;
    //   }


    openOverlay() {
        const rightWall = this.pedidoService.pedido.balcony.plumb.right_wall;

        const differenceRight = +rightWall.top - +rightWall.bottom;

        if (Math.abs(differenceRight) > 3 || differenceRight < -3) {
            this.visible = true;

            // Converte +rightWall.bottom para negativo e +rightWall.top para positivo
            const formattedDifference = differenceRight.toString() + 'mm';
            this.difference = formattedDifference;
        } else {
            this.visible = false;
        }

    }

    nextTab(): void {
        const result = Math.abs(
            +this.pedidoService.pedido.balcony.plumb.right_wall.bottom -
                +this.pedidoService.pedido.balcony.plumb.right_wall.top
        );
        if (
            this.pedidoService.pedido.balcony.plumb.right_wall.bottom &&
            this.pedidoService.pedido.balcony.plumb.right_wall.top
        ) {
            this.pedidoService.nextTab();
            if (result < 4) {
            } else {
                this._toaster.warn('Perfil fora do esquadro, por favor ajuste');
            }
        } else {
            this._toaster.warn(MESSAGES.CAMPOS_OBRIGATORIOS);
        }
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
