import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToasterService } from '../components/toaster/toaster.service';
import { PedidoJson } from '../models/pedidoJson';
import { AuthService } from './auth.service';
import { OrcamentoRequestModel } from '../models/orcamento';


@Injectable({
    providedIn: 'root',
})
export class PedidoService {
    pedido: PedidoJson;
    qtdTotalVidros: number = 0;

    apiUrl = environment.API_URL + '/orders';

    private observableDataSubject = new Subject<any>();

    activeIndex = 0;

    dimensionOK: boolean = false;

    maxActiveIndex = 0;

    constructor(
        private _http: HttpClient,
        private _toaster: ToasterService,
        private _auth: AuthService
    ) { }

    // METODOS BACKEND

    listAll(): Observable<PedidoJson[]> {
        return this._http.get<PedidoJson[]>(this.apiUrl);
    }

    listByUser(idUser: string): Observable<PedidoJson[]> {
        return this._http.get<PedidoJson[]>(this.apiUrl + '/user/' + idUser);
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

                this.removerDraft(pedido);
                this.setPedidosOK(pedidos);
                this._toaster.info('Pedido armazenado temporariamente.');
                throw error;
            })
        );
    }


    alterStatus(idOrder:string, status: string): Observable<PedidoJson> {
        return this._http.patch<PedidoJson>(this.apiUrl + '/status', {idOrder, status});
    }

    // METODOS INTERNOS

    intilizePedido(acessories?: OrcamentoRequestModel | null): PedidoJson {
        const drafts = this.getDraftPedidos();
        return {
            idUser: this._auth.getUser()?.id,
            code: drafts.length === 0 ? 1 : drafts.length + 1,
            accessories: {
                aparador_aluminio: false,
                aparador_inox: acessories?.aparador ? true : false,
                sem_aparador: acessories?.aparador ? false : true,
                selante: acessories?.selante ? true : false,
                sem_selante: acessories?.selante ? false : true,
                qtdAparador: acessories?.qtdAparador ? acessories?.qtdAparador : 0,
                qtdSelante: acessories?.qtdSelante ? acessories?.qtdSelante : 0,
                qtdProlongador: acessories?.qtdProlongador ?  acessories?.qtdProlongador : 0,
                prolongador: acessories?.prolongador ? true : false,
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
                    total: '0',
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
                    laminatedTemperad: false,
                    thickness: {
                        '8mm': false,
                        '10mm': false,
                        '12mm': false,
                        '7mm': false,
                        '9mm': false,
                        '11mm': false,
                    },
                },
                levels: {
                    full_aperture: '',
                    measures: {
                        data: [],
                        highest_ceiling: '',
                        highest_floor: '',
                        highest_prolongation: '',
                        lower_ceiling: '',
                        lower_floor: '',
                        lower_prolongation: '',
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
                name: acessories?.client ? acessories.client : '',
                neighborhood: '',
                state: '',
                zipCode: '',
                num: null,
            },
            technician: this._auth.getUser()?.name,
            observation: '',
            createdAt: new Date().toLocaleDateString('pt-BR')
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
        if (this.activeIndex < this.maxActiveIndex)this.activeIndex += 1;
        this.pedido.activeIndex = this.activeIndex;
        this.setActiveIndex(this.activeIndex);
        this.setPedido(this.pedido);
        this.notifyObservers();
        this.saveDraftPedido(this.pedido);
    }

    prevTab(): void {
        if (this.activeIndex > 0) this.activeIndex -= 1;
        this.setActiveIndex(this.activeIndex);
        this.pedido.activeIndex = this.activeIndex;
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
       // Verifique se this.pedido, this.pedido.balcony, e this.pedido.balcony.dimensions existem antes de reduzir
        if (this.pedido?.balcony?.dimensions?.data.length > 0) {
            const quantidadeTotal = this.pedido.balcony.dimensions.data.reduce((total, linha) => {
                // Utilize Number() para converter o valor em vez de operador unário +
                const quantidadeVidros = Number(linha[3]);
                return total + quantidadeVidros;
            }, 0);

            return quantidadeTotal;
        } else {
            // Retorne 0 ou outra valor padrão caso os dados não estejam disponíveis
            return 0;
        }
    }

    getQtdPecas(value?: any): number {
        if (value !== undefined) {
            // Se um valor específico for fornecido, retorna esse valor
            return value;
        } else if (this.pedido?.balcony?.format !== undefined) {
            // Se o formato estiver definido, retorna o valor de formato
            return this.pedido?.balcony?.format;
        } else {
            return 0;
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

    saveDraftPedido(pedido: PedidoJson) {
        let pedidoEncontrado = null;

        pedido.isDraft = true;

        const pedidosStorage: PedidoJson[] = JSON.parse(localStorage.getItem('draft-pedido')) || [];

        pedidoEncontrado = pedidosStorage.findIndex((p) => p.code === pedido.code);

        if (pedidoEncontrado === -1) {
            pedidosStorage.push(pedido);
        }else{
            pedidosStorage[pedidoEncontrado] = pedido;
        }

        localStorage.setItem('draft-pedido', JSON.stringify(pedidosStorage));

        this.clearLocalStorage();
    }

    getDraftPedidos(): PedidoJson[] {
        return JSON.parse(localStorage.getItem('draft-pedido')) || [];
    }

    removerDraft(pedido: PedidoJson) {
        const drafts = this.getDraftPedidos();
        if (drafts.length > 0) {
            const index = drafts.findIndex((p) => p.code === pedido.code);
            drafts.splice(index, 1);
            localStorage.setItem('draft-pedido', JSON.stringify(drafts));
        }
    }

}
