import { Component, inject } from '@angular/core';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { MESSAGES } from 'src/app/main-app/utils/messages';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo16',
    templateUrl: './passo16.component.html',
    styles: [],
})
export class Passo16Component {
    selante = '';
    aparador = '';
    qtdSelante = 0;
    qtdAparador = 0;

    pedidoService = inject(PedidoService)
    toaster = inject(ToasterService)

    ngOnInit(): void {
        this.pedidoService.getObservable().subscribe(() => {
            if (this.pedidoService.pedido.accessories.selante) {
                this.selante = 'selante';
            }

            if (this.pedidoService.pedido.accessories.sem_selante) {
                this.selante = 'sem_selante';
            }

            if (this.pedidoService.pedido.accessories.aparador_aluminio) {
                this.aparador = 'aparador_aluminio';
            }

            if (this.pedidoService.pedido.accessories.aparador_inox) {
                this.aparador = 'aparador_inox';
                this.qtdAparador = this.pedidoService.pedido.accessories.qtdAparador
            }

            if (this.pedidoService.pedido.accessories.sem_aparador) {
                this.aparador = 'sem_aparador';
            }
        });
    }


    nextTab(): void {
        if (this.aparador === 'aparador_inox') {
            this.pedidoService.pedido.accessories.aparador_inox = true;
            this.pedidoService.pedido.accessories.sem_aparador = false;
            this.pedidoService.pedido.accessories.qtdAparador = this.qtdAparador

        }

        if (this.selante === 'selante') {
            this.pedidoService.pedido.accessories.selante = true;
            this.pedidoService.pedido.accessories.sem_selante = false;
            this.pedidoService.pedido.accessories.qtdSelante = this.qtdSelante
        }

        if (this.selante === 'sem_selante') {
            this.pedidoService.pedido.accessories.sem_selante = true;
            this.pedidoService.pedido.accessories.selante = false;
        }

        if (this.selante !== '' && this.aparador !== '') {
            if (this.aparador === 'sem_aparador' || this.qtdAparador > 0) {
                if (this.selante === 'sem_selante' || this.qtdSelante > 0) {
                    this.pedidoService.nextTab();
                } else {
                    this.toaster.warn("A quantidade de selante deve ser maior que zero!");
                }
            } else {
                this.toaster.warn("A quantidade de aparador deve ser maior que zero!");
            }
        } else {
            this.toaster.warn(MESSAGES.UMA_OPCAO);
        }

    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
