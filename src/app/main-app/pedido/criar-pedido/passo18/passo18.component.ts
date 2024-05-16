import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { ImageService } from 'src/app/services/image.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo18',
    templateUrl: './passo18.component.html',
    styles: [
        `
            .index {
                z-index: 800;
            }
        `,
    ],
})
export class Passo18Component {
    draftPedidos: PedidoJson[] = [];
    pedido: PedidoJson;
    disableEnviar = false;

    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService,
        private _router: Router,
        private imageService: ImageService,
        private ldService: LoadingService
    ) { }


    enviar() {
        const imagem = localStorage.getItem('imagemBase64');
        this.ldService.start();

        if (imagem) {
            this.pedidoService
                .create(this.pedidoService.pedido)
                .pipe(finalize(() => (this.disableEnviar = true)))
                .subscribe((response) => {
                    this.imageService
                        .uploadOrderImageFromLocalStorage(response._id)
                        .subscribe((data) => {
                            this.pedidoService.dimensionOK = false;
                            this.pedidoService.saveDraftPedido(this.pedidoService.pedido);
                            this.pedidoService.pedido.images = data;
                            this._toaster.success('Pedido Salvo com Sucesso');
                            localStorage.removeItem('imagemBase64');

                            setTimeout(() => {
                                this._router.navigate(['/app/pedidos/listar']).then(() => {
                                    this.pedidoService.removerDraft(this.pedidoService.pedido);
                                    this.ldService.stop();
                                });
                            }, 1000);
                        });
                });
        } else {
            this.pedidoService
                .create(this.pedidoService.pedido)
                .pipe(finalize(() => (this.disableEnviar = true)))
                .subscribe((response) => {
                    this.pedidoService.dimensionOK = false;

                    setTimeout(() => {
                        this._router.navigate(['/app/pedidos/listar']).then(() => {
                            this.pedidoService.removerDraft(this.pedidoService.pedido);
                            this.ldService.stop();
                        });
                    }, 1500);
                });
        }
    }

}
