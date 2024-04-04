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

    pedidoService = inject(PedidoService) 
    toaster = inject(ToasterService) 

    ngOnInit(): void {
        this.pedidoService.getObservable().subscribe(() => {
            if (this.pedidoService.pedido.accessories.selante) {
                this.selante = 'selante';
            }
            else if (this.pedidoService.pedido.accessories.sem_selante) {
                this.selante = 'sem_selante';
            }
            else if (this.pedidoService.pedido.accessories.aparador_aluminio) {
                this.aparador = 'aparador_aluminio';
            }
            else if (this.pedidoService.pedido.accessories.aparador_inox) {
                this.aparador = 'aparador_inox';
            }
            else if (this.pedidoService.pedido.accessories.sem_aparador) {
                this.aparador = 'sem_aparador';
            }
        });
    }


    nextTab(): void {
        if (this.aparador !== '' && this.selante !== '') {
            this.pedidoService.nextTab();
        } else {
            this.toaster.warn(MESSAGES.UMA_OPCAO);
        }
    }
    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
