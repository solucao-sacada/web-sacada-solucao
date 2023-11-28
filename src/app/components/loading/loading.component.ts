import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styles: [
        `
            .loading {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100vw;
                height: 100vh;
                opacity: 0.5;
                background-color: black;
                z-index: 1000;
            }
            .spinner {
                z-index: 1100;
            }
        `,
    ],
})
export class LoadingComponent {
    constructor(public loadingService: LoadingService) {}
}
