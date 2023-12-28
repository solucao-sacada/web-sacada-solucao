import { Injectable } from '@angular/core';
import { PedidoJson } from '../models/pedidoJson';
import { Observable, Subject, catchError } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToasterService } from '../components/toaster/toaster.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class PedidoService {
    pedido: PedidoJson;
    qtdTotalVidros: number = 0;

    apiUrl = environment.API_URL + '/orders';

    private observableDataSubject = new Subject<any>();

    activeIndex = 0;

    maxActiveIndex = 0;

    constructor(
        private _http: HttpClient,
        private _toaster: ToasterService,
        private _auth: AuthService
    ) {}

    // METODOS BACKEND

    listAll(): Observable<PedidoJson[]> {
        return this._http.get<PedidoJson[]>(this.apiUrl);
    }

    create(pedido: PedidoJson): Observable<any> {
        return this._http.post<any>(this.apiUrl, pedido).pipe(
            catchError((error) => {
                console.error('Ocorreu um erro:', error);
                const pedidos: PedidoJson[] =
                    JSON.parse(this.getPedidosOK()) || [];

                if (
                    pedidos.filter((item) => item.code === pedido.code)
                        .length === 0
                )
                    pedidos.push(pedido);

                this.setPedidosOK(pedidos);
                this._toaster.info('Pedido armazenado temporariamente.');
                return '';
            })
        );
    }

    // METODOS INTERNOS

    intilizePedido(): PedidoJson {
        return {
            idUser: this._auth.getUser()._id,
            code: Math.random() * 10,
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
                    full_aperture: '',
                    measures: {
                        data: [],
                        highest_ceiling: '',
                        highest_floor: '',
                        lower_ceiling: '',
                        lower_floor: '',
                    },
                },
                lock: {
                    fechadura_para_porta: false,
                    fechadura_vidro_vidro: false,
                    pvc: false,
                    ferro: false,
                    '1520/1531': false,
                    '3210/3211': false,
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
            technician: this._auth.getUser().name,
            observation: '',
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

    setPedidosOK(pedidos: PedidoJson[]) {
        localStorage.setItem('pedidosOK', JSON.stringify(pedidos));
    }

    getPedidosOK(): string {
        return localStorage.getItem('pedidosOK');
    }

    removePedidosOk() {
        localStorage.removeItem('pedidosOK');
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
        if (this.activeIndex < this.maxActiveIndex) this.activeIndex += 1;
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
        if (
            !this.pedido?.balcony.dimensions.data ||
            this.pedido?.balcony.dimensions.data.length === 0
        ) {
            return 0;
        }

        const quantidadeTotal = this.pedido?.balcony.dimensions.data.reduce(
            (total, linha) => {
                const quantidadeVidros = linha[3] ? +linha[3] : 0;
                return total + quantidadeVidros;
            },
            0
        );

        return quantidadeTotal;
    }

    getQtdPecas(): number {
        switch (this.pedido?.balcony.format) {
            case 1:
                return 1;
            case 2:
            case 3:
                return 2;
            case 4:
                return 3;
            default:
                return +this.pedido?.balcony.format;
        }
    }

    isTabDisabled(tabIndex: number): boolean {
        return tabIndex > this.activeIndex;
    }

    sendMessageQuestion(passo: string) {
        const msg = `Olá, estou com dúvidas no preenchimento da etapa ${passo} do preenchimento do formulário de pedido.`;

        window.open(
            `http://wa.me/5548984052727?text=${encodeURIComponent(msg)}`,
            '_blank'
        );
    }
}
