import { Component } from '@angular/core';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent {
    pedidos: PedidoJson[] = []
    qtdTotal: number = 0
    qtdEntregue: number = 0
    constructor(private pedidoService: PedidoService) {}

    ngOnInit(): void {
        this.pedidoService.listAll().subscribe(response => {
            this.pedidos = response
            this.qtdTotal = response.length
            this.qtdEntregue = 3 // TODO implementar logica para calcular os entregues baseado no status
        })
    }
}
