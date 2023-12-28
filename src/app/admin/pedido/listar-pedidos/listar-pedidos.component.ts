import { Component } from '@angular/core';
import { Color, PedidoJson, Tip6 } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-listar-pedidos',
    templateUrl: './listar-pedidos.component.html',
    styleUrls: ['./listar-pedidos.component.scss'],
})
export class ListarPedidosComponent {
    pedidos: PedidoJson[] = [];
    pedido: PedidoJson;
    activeIndex: number = 0;

    constructor(public pedidoService: PedidoService) {}

    ngOnInit(): void {
        this.pedidoService.listAll().subscribe((data) => {
            this.pedidos = data;
        });
    }

    onSelectRow(value: any) {
        console.log(value);
        this.pedido = value.data;
        this.activeIndex = 1;
    }
}
