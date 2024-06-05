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
        this.pedidoService.listByUser(this.user.id).subscribe((pedido) => {
            this.pedidos = pedido;
            this.qtdTotal = pedido.length;

            // Alterar status para CREATED para DONE depois que tiver concluido os status
            this.qtdEntregue = pedido.filter((p) => p.status === 'DONE').length;
        });
        const user = this.auth.getUser();
        if(user.role === "ADMIN" || user.role === "SUPER"){
            this.orcamentoService.list().subscribe({
                next: (orcamentos) => {
                    this.qtdOrcamentos = orcamentos.length;
                },
                error: (error) => {
                    console.log(error);
                },
            })
        }else{
            this.orcamentoService.listByClient(user.id).subscribe({
                next: (orcamentos) => {
                    this.qtdOrcamentos = orcamentos.length;
                },
                error: (error) => {
                    console.log(error);
                },
            })
        }
    }
}
