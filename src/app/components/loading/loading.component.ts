import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styles: [
        `
            .loading {
                position: fixed;
                top: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100vw;
                height: 100vh;
                opacity: 0.5;
                background-color: black;
                z-index: 2000;
            }
            .spinner {
                z-index: 2100;
            }
        `,
    ],
})
export class LoadingComponent {
    constructor(public loadingService: LoadingService) {}
}
