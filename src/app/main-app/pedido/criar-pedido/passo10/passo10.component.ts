import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MESSAGES } from 'src/app/main-app/utils/messages';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo10',
    templateUrl: './passo10.component.html',
    styles: [],
})
export class Passo10Component implements AfterViewInit {
    @ViewChild('inputElement') inputElement: ElementRef;
    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) { }

    difference = '';
    visible = false;

    ngOnInit(): void {
        this.pedidoService.getObservable().subscribe(() => {
            this.openOverlay();
        });
    }

    ngAfterViewInit(): void {
        let activeIndex = this.pedidoService.getActiveIndex();
        if (activeIndex === 9) {
            this.setCursorToStart();
        }
    }

    validateNumberInput(event: KeyboardEvent) {
        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
        const isNumber = /\d/.test(event.key);

        if (!isNumber && !allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }

    openOverlay() {
        const leftWall = this.pedidoService.pedido.balcony.plumb.left_wall;

        const differenceLeft = +leftWall.top - +leftWall.bottom;

        if (Math.abs(differenceLeft) > 3 || differenceLeft < -3) {
            this.visible = true;

            // Converte +leftWall.bottom para negativo e +leftWall.top para positivo
            const formattedDifference = differenceLeft.toString() + 'mm';
            this.difference = formattedDifference;
        } else {
            this.visible = false;
        }
    }

    setCursorToStart() {
        const input = this.inputElement.nativeElement;
        input.focus();
        input.setSelectionRange(0, 0);
    }



    nextTab(): void {
        const result = Math.abs(
            +this.pedidoService.pedido.balcony.plumb.left_wall.bottom -
            +this.pedidoService.pedido.balcony.plumb.left_wall.top
        );
        if (
            this.pedidoService.pedido.balcony.plumb.left_wall.bottom &&
            this.pedidoService.pedido.balcony.plumb.left_wall.top
        ) {
            this.pedidoService.nextTab();
            if (result < 4) {
            }
            else {
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
