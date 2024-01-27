import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { CanComponentDeactivate } from 'src/app/guards/can-dectivate.guard';
import { Pedido } from 'src/app/models/pedido';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-criar-pedido',
    templateUrl: './criar-pedido.component.html',
    styles: [],
})
export class CriarPedidoComponent implements CanComponentDeactivate {
    pedidoString = this.pedidoService.getPedido();

    constructor(
        public pedidoService: PedidoService,
        private confirmationService: ConfirmationService
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
                    this.pedidoService.pedido =
                        this.pedidoService.intilizePedido();
                    this.pedidoService.setActiveIndex(0);
                },
            });
        else {
            this.pedidoService.activeIndex =
                this.pedidoService.pedido?.activeIndex || 0;
        }
        this.pedidoService.maxActiveIndex = 17;
    }

    canDeactivate(): boolean | Promise<boolean> {
        if (this.pedidoService.activeIndex > 0)
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
        else return true;
    }
}
