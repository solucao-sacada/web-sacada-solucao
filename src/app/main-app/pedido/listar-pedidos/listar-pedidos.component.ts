import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as jspdf from 'jspdf';
import { ConfirmationService } from 'primeng/api';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { PedidoJson } from 'src/app/models/pedidoJson';
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
    linkJSON!: SafeUrl

    @ViewChild('printable') public dataToExport: ElementRef;

    constructor(
        public pedidoService: PedidoService,
        private router: Router,
        private activetedRoute: ActivatedRoute,
        private _toaster: ToasterService,
        private confirmationService: ConfirmationService,
        private sanatizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.activetedRoute.params.subscribe((params) => {
            const draft = params['draft'];
            if (draft) {
                this.activeIndex = 2;
            }
        });

        this.pedidoService.pedido = this.pedidoService.intilizePedido();
        this.pedidoService.listByUser().subscribe((data) => {
            this.pedidos = data;
            this.draftPedidos = this.pedidoService.getDraftPedidos();
        });
    }

    print() {
        if (this.pedido) window.print();
        else this._toaster.warn('Selecione um pedido para imprimir');
    }

    downloadAsPdf(): void {
        const pdf = new jspdf.jsPDF();

        // Obtém o conteúdo HTML que você deseja incluir no PDF
        let conteudo = this.dataToExport.nativeElement;
        // Adiciona o conteúdo ao PDF
        pdf.html(conteudo, {
            x: 15,
            y: 5,
            width: 180,
            windowWidth: 650,
            callback: (pdf) => {
                pdf.setProperties({
                    title: `Detalhes do pedido ${this.pedido.code} - Cliente: ${this.pedido.client.name} - Responsável: ${this.pedido.technician}`,
                });
                pdf.save(
                    'pedido-' +
                        this.pedido.code +
                        '-' +
                        this.pedido.client.name +
                        '-' +
                        this.pedido.technician +
                        '.pdf'
                );
            },
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
        if (value.data._id) {
            this.pedido = value.data;
            this.activeIndex = 1;
        }else {
            this.pedidoService.pedido = value.data;
            this.pedidoService.pedido.isDraft = true;
            this.pedidoService.setActiveIndex(
                this.pedidoService.pedido.activeIndex || 0
            );
            this.router.navigate(['/app/pedidos/novo']);
        }
    }

    gerarJSON(pedido: PedidoJson){
        const json = JSON.stringify(pedido);
        const url = this.sanatizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));

        this.linkJSON = url.toString();
    }

    verJSON(pedido: PedidoJson){
        // abrir url no navegador
        window.open(pedido.urlJSON, '_blank');
    }
}
