import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { concat } from 'rxjs';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { Color, PedidoJson, Tip6 } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-listar-pedidos',
    templateUrl: './listar-pedidos.component.html',
    styleUrls: ['./listar-pedidos.component.scss'],
})
export class ListarPedidosComponent {
    pedidos: PedidoJson[] = [];
    draftPedidos: PedidoJson[] = [];
    pedido: PedidoJson;
    activeIndex: number = 0;

    constructor(
        public pedidoService: PedidoService,
        private router: Router,
        private activetedRoute: ActivatedRoute,
        private _toaster: ToasterService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.activetedRoute.params.subscribe((params) => {
            const draft = params['draft'];
            if (draft) {
                this.activeIndex = 2;
            }
        });

        this.pedidoService.pedido = this.pedidoService.intilizePedido();
        this.pedidoService.listAll().subscribe((data) => {
            this.pedidos = data;
            this.draftPedidos = this.pedidoService.getDraftPedidos();
        });
    }

    excluirDraft(pedido: PedidoJson) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir este pedido de rascunho?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                const drafts = this.pedidoService.getDraftPedidos();
                this.pedidoService.removerDraft(pedido);
                const draftsAfter = this.pedidoService.getDraftPedidos();
                if (drafts > draftsAfter) {
                    this._toaster.success('Excluído com sucesso');
                    this.draftPedidos = this.pedidoService.getDraftPedidos();
                }
            },
            reject: () => {
                this._toaster.info('Operação cancelada');
            },
        });
    }

    onSelectRow(value: any) {
        console.log(value);
        if (value.data._id) {
            this.pedido = value.data;
            this.activeIndex = 1;
        } else {
            this.pedidoService.pedido = value.data;
            this.pedidoService.pedido.isDraft = true;
            this.pedidoService.setActiveIndex(
                this.pedidoService.pedido.activeIndex || 0
            );
            this.router.navigate(['/admin/pedidos/novo']);
        }
    }
}
