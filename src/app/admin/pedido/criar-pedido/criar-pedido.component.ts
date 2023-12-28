import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Pedido } from 'src/app/models/pedido';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-criar-pedido',
    templateUrl: './criar-pedido.component.html',
    styles: [],
})
export class CriarPedidoComponent {
    pedidoString = this.pedidoService.getPedido();

    constructor(
        public pedidoService: PedidoService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        if (this.pedidoString)
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
                    // this.pedidoService.clearLocalStorage();
                    this.pedidoService.activeIndex = 0;
                    this.pedidoService.pedido =
                        this.pedidoService.intilizePedido();
                    // this.pedidoService.setActiveIndex(0);
                },
            });
        else {
            this.pedidoService.pedido = this.pedidoService.intilizePedido();
        }
        this.pedidoService.maxActiveIndex = 17;
    }
}
