import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PedidoService } from './services/pedido.service';
import { PedidoJson } from './models/pedidoJson';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig,
        private pedidoService: PedidoService
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
}
