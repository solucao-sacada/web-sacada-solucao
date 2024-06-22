import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PedidoService } from './services/pedido.service';
import { PedidoJson } from './models/pedidoJson';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig,
        private pedidoService: PedidoService,
        private platform: Platform,
        private router: Router
    ) {}

    pedidosPendentes: PedidoJson[] = [];

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.pedidosPendentes =
            JSON.parse(this.pedidoService.getPedidosOK()) || null;
        if (this.pedidosPendentes?.length > 0) {
            this.pedidosPendentes.map((pedido) => {
                this.pedidoService
                    .create(pedido)
                    .subscribe(() => this.pedidoService.removePedidosOk());
            });
        }
    }

    setupBackButtonBehavior() {
        App.addListener('backButton', ({ canGoBack }) => {
          if (canGoBack) {
            window.history.back();
          } else {
            App.exitApp();
          }
        });
      }

    initializeApp() {
        this.platform.ready().then(() => {
          this.setupBackButtonBehavior();
        });
    }
}
