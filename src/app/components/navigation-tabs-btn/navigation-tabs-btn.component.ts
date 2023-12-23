import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-navigation-tabs-btn',
    templateUrl: './navigation-tabs-btn.component.html',
    styles: [],
})
export class NavigationTabsBtnComponent {
    @Input() showPrev: boolean = true;
    @Input() showNext: boolean = true;
    @Output() nextTab = new EventEmitter();
    @Output() prevTab = new EventEmitter();

    constructor(private pedidoService: PedidoService) {}

    _prevTab(): void {
        this.prevTab.emit();
    }
    _nextTab(): void {
        this.nextTab.emit();
    }
}
