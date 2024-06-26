import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { Balcony, PedidoJson } from 'src/app/models/pedidoJson';
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
        const imagem = localStorage.getItem('imagemBase64') || '';
        const draftPedidos = this.pedidoService.getDraftPedidos();

        const findPedido = draftPedidos.find((p) => p.code === this.pedidoService.pedido.code);

        this.ldService.start();
        if (imagem) {
            const formData = new FormData();
            const file = this.imageService.dataURItoBlob();
            formData.append('images', file, `image.${file.type.split('/')[1]}`);

            this.pedidoService
                .create({
                    ...this.pedidoService.pedido,
                    balcony:{
                        ...this.pedidoService.pedido.balcony,
                        rails: {
                            ...this.pedidoService.pedido.balcony.rails,
                            lower_rail: {
                                ...this.pedidoService.pedido.balcony.rails.lower_rail,
                                built_in:{
                                    ...this.pedidoService.pedido.balcony.rails.lower_rail.built_in,
                                    tip: {
                                        ...this.pedidoService.pedido.balcony.rails.lower_rail.built_in.tip
                                    }
                                }
                            }
                        },
                        plumb: {
                            left_wall: {
                                top: String(this.pedidoService.pedido.balcony.plumb.left_wall.top),
                                bottom: String(this.pedidoService.pedido.balcony.plumb.left_wall.bottom),
                            },
                            right_wall: {
                                top: String(this.pedidoService.pedido.balcony.plumb.right_wall.top),
                                bottom: String(this.pedidoService.pedido.balcony.plumb.right_wall.bottom),
                            }
                        },
                        aperture: {
                            ...this.pedidoService.pedido.balcony.aperture,
                            locations: this.pedidoService.pedido.balcony.aperture.locations.map((aperture) => {
                                return {
                                    glasses: String(aperture.glasses),
                                };
                            })
                        },
                        levels: {
                            measures: {
                                // converter os valores de measures para string
                                data: this.pedidoService.pedido.balcony.levels.measures.data.map((data) => data.map((value) => String(value))),
                            }
                        },
                        dimensions: findPedido.balcony.dimensions
                    } as Balcony,
                })
                .pipe(finalize(() => (this.disableEnviar = true)))
                .subscribe((response) => {
                    this.imageService
                        .uploadOrderImageFromLocalStorage(response._id, formData)
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
                .create({
                    ...this.pedidoService.pedido,

                    balcony:{
                        ...this.pedidoService.pedido.balcony,
                        rails: {
                            ...this.pedidoService.pedido.balcony.rails,
                            lower_rail: {
                                ...this.pedidoService.pedido.balcony.rails.lower_rail,
                                built_in:{
                                    ...this.pedidoService.pedido.balcony.rails.lower_rail.built_in,
                                    tip: {
                                        ...this.pedidoService.pedido.balcony.rails.lower_rail.built_in.tip
                                    }
                                }
                            }
                        },
                        plumb: {
                            left_wall: {
                                top: String(this.pedidoService.pedido.balcony.plumb.left_wall.top),
                                bottom: String(this.pedidoService.pedido.balcony.plumb.left_wall.bottom),
                            },
                            right_wall: {
                                top: String(this.pedidoService.pedido.balcony.plumb.right_wall.top),
                                bottom: String(this.pedidoService.pedido.balcony.plumb.right_wall.bottom),
                            }
                        },
                        aperture: {
                            ...this.pedidoService.pedido.balcony.aperture,
                            locations: this.pedidoService.pedido.balcony.aperture.locations.map((aperture) => {
                                return {
                                    glasses: String(aperture.glasses),
                                };
                            })
                        },
                        levels: {
                            measures: {
                                data: this.pedidoService.pedido.balcony.levels.measures.data.map((data) => data.map((value) => String(value))),
                            }
                        },
                        dimensions: findPedido.balcony.dimensions
                    } as Balcony
                })
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
