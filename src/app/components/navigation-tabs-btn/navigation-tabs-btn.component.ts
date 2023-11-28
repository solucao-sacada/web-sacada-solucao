import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-navigation-tabs-btn',
    templateUrl: './navigation-tabs-btn.component.html',
    styles: [],
})
export class NavigationTabsBtnComponent {
    @Output() nextTab = new EventEmitter();
    @Output() prevTab = new EventEmitter();

    _prevTab(): void {
        this.prevTab.emit();
    }
    _nextTab(): void {
        this.nextTab.emit();
    }
}
