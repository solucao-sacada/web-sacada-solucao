import { Component, inject } from '@angular/core';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [
        `
            img {
                object-fit: cover;
            }
        `,
    ],
})
export class DashboardComponent {
    pedidos: PedidoJson[] = [];
    qtdTotal: number = 0;
    qtdOrcamentos: number = 0;
    qtdEntregue: number = 0;
    user: User = this.auth.getUser();
    constructor(
        private pedidoService: PedidoService,
        private auth: AuthService
    ) {}
    orcamentoService = inject(OrcamentoService);

    ngOnInit(): void {
        this.pedidoService.listAll().subscribe((response) => {
            this.pedidos = response;
            this.qtdTotal = response.length;
            this.qtdEntregue = 3; // TODO implementar logica para calcular os entregues baseado no status
        });
        this.orcamentoService.list().subscribe((orcamentos) => {
            this.qtdOrcamentos = orcamentos.length;
        });
    }
}
