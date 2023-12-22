import { Component, EventEmitter, Output } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-navigation-tabs-btn',
    templateUrl: './navigation-tabs-btn.component.html',
    styles: [],
})
export class NavigationTabsBtnComponent {
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
