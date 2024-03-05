import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-pedido',
    template: `<router-outlet></router-outlet><p-toast key="tst"></p-toast>`,
    styles: [],
})
export class PedidoComponent implements OnInit {
    constructor(public pedidoService: PedidoService) {}

    ngOnInit(): void {}
}
