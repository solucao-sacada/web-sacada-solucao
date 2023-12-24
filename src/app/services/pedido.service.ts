import { Injectable } from '@angular/core';
import { PedidoJson } from '../models/pedidoJson';
import { Subject } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class PedidoService {
    pedido: PedidoJson = this.intilizePedido();
    qtdTotalVidros: number = 0;

    private observableDataSubject = new Subject<any>();

    activeIndex = 0;

    constructor(private confirmationService: ConfirmationService) {}

    intilizePedido(): PedidoJson {
        return {
            accessories: {
                aparador_aluminio: false,
                aparador_inox: false,
                selante: false,
            },
            balcony: {
                aluminium: {
                    color: {
                        black: false,
                        bz1001: false,
                        bz1002: false,
                        bz1003: false,
                        mat: false,
                        white: false,
                        other: null,
                    },
                },
                aperture: {
                    inside: false,
                    locations: [],
                    outside: false,
                },
                beam: {
                    position: {
                        aligned: false,
                        inside: false,
                        outside: false,
                    },
                },
                dimensions: {
                    data: [],
                    total: '',
                },
                glass: {
                    color: {
                        bronze: false,
                        colorless: false,
                        green: false,
                        tinted: false,
                        other: null,
                    },
                    laminated: false,
                    tempered: false,
                    thickness: {
                        '10mm': false,
                        '8mm': false,
                    },
                },
                levels: {
                    full_aperture: '1080',
                    measures: {
                        data: [['1000', '80']],
                        highest_ceiling: '1000',
                        highest_floor: '80',
                        lower_ceiling: '1000',
                        lower_floor: '80',
                    },
                },
                lock: {
                    fechadura_para_porta: false,
                    fechadura_vidro_vidro: false,
                },
                plumb: {
                    left_wall: {
                        bottom: null,
                        top: null,
                    },
                    right_wall: {
                        bottom: null,
                        top: null,
                    },
                },
                rails: {
                    lower_rail: {
                        built_in: {
                            ref: {
                                A: false,
                                B: false,
                                C: false,
                                other: false,
                            },
                            tip: {
                                A: false,
                                B: false,
                                C: false,
                                D: false,
                            },
                        },
                        normal: {
                            tip: {
                                A: false,
                                B: false,
                                C: false,
                                other: false,
                            },
                        },
                        tab: {
                            inside: false,
                            outside: false,
                            tip: {
                                A: false,
                                B: false,
                                C: false,
                                D: false,
                                E: false,
                            },
                        },
                        tip: {
                            built_in: false,
                            normal: false,
                            tab: false,
                        },
                    },
                    upper_rail: {
                        tab: {
                            inside: false,
                            outside: false,
                        },
                        tip: {
                            normal: false,
                            tab: false,
                        },
                    },
                },
                tip: {
                    better_adjustment: false,
                    defined: {
                        glass_quantity: null,
                        isDefined: false,
                    },
                },
                format: 0,
            },
            client: {
                address: '',
                apartment: '',
                building: '',
                city: '',
                name: '',
                neighborhood: '',
                state: '',
                zipCode: '',
                num: null,
            },
            technician: '',
        };
    }

    clearLocalStorage() {
        localStorage.removeItem('pedido');
        localStorage.removeItem('activeIndex');
    }

    notifyObservers(): void {
        this.observableDataSubject.next(this.pedido);
    }

    getObservable(): Subject<PedidoJson> {
        return this.observableDataSubject;
    }

    setPedido(pedido: PedidoJson) {
        localStorage.setItem('pedido', JSON.stringify(pedido));
        console.info('[INFO] Pedido armazenado localmente!', pedido);
    }

    getPedido(): string {
        return localStorage.getItem('pedido');
    }

    setActiveIndex(activeIndex: number) {
        localStorage.setItem('activeIndex', activeIndex.toString());
    }

    getActiveIndex(): number {
        return +localStorage.getItem('activeIndex') || 0;
    }

    nextTab(): void {
        this.activeIndex += 1;
        this.setActiveIndex(this.activeIndex);
        this.setPedido(this.pedido);
        this.notifyObservers();
    }

    prevTab(): void {
        if (this.activeIndex > 0) this.activeIndex -= 1;
        this.setActiveIndex(this.activeIndex);
        this.setPedido(this.pedido);
        this.notifyObservers();
    }

    changeTab(event: any) {
        this.activeIndex = event.index || 0;
        this.setActiveIndex(this.activeIndex);
        this.setPedido(this.pedido);
        this.notifyObservers();
    }

    getQuantidadeTotalVidros(): number {
        return this.pedido.balcony.dimensions.data.reduce(
            (total, linha) => total + (linha[3] ? +linha[3] : 0),
            0
        );
    }

    getQtdPecas(): number {
        switch (this.pedido.balcony.format) {
            case 1:
                return 1;
            case 2:
            case 3:
                return 2;
            case 4:
                return 3;
            default:
                return +this.pedido.balcony.format;
        }
    }

    isTabDisabled(tabIndex: number): boolean {
        return tabIndex > this.activeIndex;
    }
}
