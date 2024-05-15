import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as jspdf from 'jspdf';
import { ConfirmationService } from 'primeng/api';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-listar-pedidos',
    templateUrl: './listar-pedidos.component.html',
    styleUrls: ['./listar-pedidos.component.scss'],
})
export class ListarPedidosComponent {
    pedidos: PedidoJson[] = [];
    status = ['Pendente',  'Em andamento', 'Cancelado', 'Finalizado', 'Aguardando Resposta'];
    selectedStatus = 'Selecionar novo status';
    newStatus = ''

    draftPedidos: PedidoJson[] = [];
    pedido: PedidoJson;
    activeIndex: number = 0;
    linkJSON!: SafeUrl;
    code = 1;
    user: User = {} as User;

    @ViewChild('printable') public dataToExport: ElementRef;

    constructor(
        public pedidoService: PedidoService,
        private router: Router,
        private activetedRoute: ActivatedRoute,
        private _toaster: ToasterService,
        private confirmationService: ConfirmationService,
        private sanatizer: DomSanitizer,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.pedidoService.dimensionOK = false;
        this.activetedRoute.params.subscribe((params) => {
            const draft = params['draft'];
            if (draft) {
                this.activeIndex = 2;
            }
        });
        this.loadPedidos();
        this.loadDraftPedidos();
    }

    loadPedidos() {
        this.user = this.authService.getUser();

       if(this.user.role === 'ADMIN' || this.user.role === 'SUPER'){
        this.pedidoService.listAll().subscribe({
            next: (data) => {
                this.pedidos = data;
            },
            error: (error) => {
                console.log(error);
            },
        });

       }else{
        this.pedidoService.listByUser(this.user.id).subscribe((data) => {
            this.pedidos = data;
        });
       }
    }

    loadDraftPedidos(){
        this.draftPedidos = this.pedidoService.getDraftPedidos()
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
            this.pedidoService.dimensionOK = true;
            this.pedido = value.data;
            this.activeIndex = 1;
            this.newStatus = value.data.status;

            if(this.newStatus === 'PENDING'){
                this.newStatus = 'Pendente';
            }else if(this.newStatus === 'APPROVED'){
                this.newStatus = 'Aprovado';
            }else if(this.newStatus === 'IN_PROGRESS'){
                this.newStatus = 'Em andamento';
            }else if(this.newStatus === 'CANCELED'){
                this.newStatus = 'Cancelado';
            }else if(this.newStatus === 'WAIT_ANSWER'){
                this.newStatus = 'Aguardando Resposta';
            }if(this.newStatus === 'DONE'){
                this.newStatus = 'Finalizado';
            }
            return
        }

        if(value.data.code){
            this.pedidoService.pedido = value.data;
            this.pedidoService.setPedido(value.data);
            this.pedidoService.dimensionOK = true;
            this.pedidoService.setActiveIndex(value.data.activeIndex);
            this.router.navigate(['/app/pedidos/novo']);
            return
        }
    }

    gerarJSON(pedido: PedidoJson) {
        const jsonString = JSON.stringify(pedido, null, 2);

        // Criando um Blob a partir da string JSON
        const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });

        // Criando um URL para o Blob
        const blobUrl = URL.createObjectURL(blob);

        // Criando um link de download
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = `${pedido._id} - pedido.json`; // Nome do arquivo que será baixado
        downloadLink.click();
    }

    verJSON(pedido: PedidoJson){
        // abrir url no navegador
        window.open(pedido.urlJSON, '_blank');
    }

    alterStatusPedido(id:string){
        let status = this.selectedStatus;

        if(this.selectedStatus){
            if(status === 'Cancelado'){
                status = 'CANCELED';
            }else if(status === 'Pendente'){
                status = 'PENDING';
            }else if(status === 'Aguardando'){
                status = 'WAITING';
            }else if(status === 'Finalizado'){
                status = 'DONE';
            }else if(status === 'Aguardando Resposta'){
                status = 'WAIT_ANSWER';
            }else if(status === 'Em andamento'){
                status = 'IN_PROGRESS'
            }
        }

        this.pedidoService.alterStatus(this.pedido._id, status).subscribe({
            next: (pedido) => {
                this.newStatus = status;
                if(this.newStatus === 'PENDING'){
                    this.newStatus = 'Pendente';
                }else if(this.newStatus === 'APPROVED'){
                    this.newStatus = 'Aprovado';
                }else if(this.newStatus === 'IN_PROGRESS'){
                    this.newStatus = 'Em andamento';
                }else if(this.newStatus === 'CANCELED'){
                    this.newStatus = 'Cancelado';
                }else if(this.newStatus === 'DONE'){
                    this.newStatus = 'Finalizado';
                }else if(this.newStatus === 'WAIT_ANSWER'){
                    this.newStatus = 'Aguardando Resposta';
                }
                console.log(status)
                this.loadPedidos();
                this._toaster.success('Status alterado com sucesso');
            },
            error: (error) => {
                this._toaster.error('Erro ao alterar status');
            },
        })
        this.selectedStatus = 'Selecionar novo status';
    }
}
