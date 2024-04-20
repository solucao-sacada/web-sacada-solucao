import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { ImageService } from 'src/app/services/image.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo18',
    templateUrl: './passo18.component.html',
    styles: [],
})
export class Passo18Component{
    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService,
        private _router: Router,
        private imageServive: ImageService
    ) {}

    disableEnviar = false;

    enviar() {
        const imagem = localStorage.getItem('imagemBase64')
        if(imagem){
            this.pedidoService
            .create(this.pedidoService.pedido)
            .pipe(finalize(() => (this.disableEnviar = true)))
            .subscribe((response) => {
                this.imageServive
                    .uploadOrderImageFromLocalStorage(response._id)
                    .subscribe((data) => {
                        this.pedidoService.dimensionOK = false;
                        this.pedidoService.saveDraftPedido(this.pedidoService.pedido);
                        this.pedidoService.pedido.images = data;
                        this._toaster.success('Pedido Salvo com Sucesso');

                        this.pedidoService.removePedidosOk();
                        setTimeout(() => {
                            this._router.navigate(['/app/pedidos/listar']);
                        }, 1500);
                    });
            });
        }else{
            this.pedidoService
            .create(this.pedidoService.pedido)
            .pipe(finalize(() => (this.disableEnviar = true)))
            .subscribe((response) => {
                this.pedidoService.dimensionOK = false;
                this.pedidoService.saveDraftPedido(this.pedidoService.pedido);
                this._toaster.success('Pedido Salvo com Sucesso');

                this.pedidoService.removePedidosOk();
                setTimeout(() => {
                    this._router.navigate(['/app/pedidos/listar']);
                }, 1500);
            });
        }

    }
}
