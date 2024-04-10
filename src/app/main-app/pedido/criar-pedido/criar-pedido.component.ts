import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CanComponentDeactivate } from 'src/app/guards/can-dectivate.guard';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-criar-pedido',
    templateUrl: './criar-pedido.component.html',
    styles: [],
})
export class CriarPedidoComponent implements CanComponentDeactivate, OnInit {
    pedidoString = this.pedidoService.getPedido();

    constructor(
        public pedidoService: PedidoService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.pedidoString && !this.pedidoService.pedido.isDraft)
            this.confirmationService.confirm({
                message:
                    'Encontramos um pedido em andamento, deseja dar prosseguimento?',
                header: 'Confirmação',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sim',
                rejectLabel: 'Não',
                rejectButtonStyleClass: 'p-button-text',
                accept: () => {
                    this.pedidoService.pedido = JSON.parse(this.pedidoString);
                    this.pedidoService.activeIndex =
                    this.pedidoService.getActiveIndex();
                    this.pedidoService.notifyObservers();
                },
                reject: () => {
                    this.pedidoService.clearLocalStorage();
                    this.pedidoService.activeIndex = 0;
                    this.pedidoService.pedido = this.pedidoService.intilizePedido();
                    this.pedidoService.setActiveIndex(0);
                },
            });
        else {
            this.pedidoService.activeIndex =
                this.pedidoService.pedido?.activeIndex || 0;
        }

        if(!this.pedidoString){
            this.pedidoService.pedido = this.pedidoService.intilizePedido();
        }
        this.pedidoService.maxActiveIndex = 17;

    }

    canDeactivate(): boolean | Promise<boolean> {
        if (this.pedidoService.activeIndex > 0) {
            localStorage.removeItem('imagemBase64');
            return new Promise<boolean>((resolve, reject) => {
                this.confirmationService.confirm({
                    message:
                        'Deseja salvar este pedido como rascunho para completar mais tarde?',
                    header: 'Confirmação',
                    icon: 'pi pi-exclamation-triangle',
                    acceptLabel: 'Sim',
                    rejectLabel: 'Não',
                    rejectButtonStyleClass: 'p-button-text',
                    accept: () => {
                        this.pedidoService.saveDraftPedido(
                            this.pedidoService.pedido
                        );
                        resolve(true);
                    },
                    reject: () => {
                        resolve(true);
                    },
                });
            });
        } else return true;
    }
}
