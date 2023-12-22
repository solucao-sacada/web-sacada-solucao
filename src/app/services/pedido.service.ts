import { Injectable } from '@angular/core';
import { PedidoJson } from '../models/pedidoJson';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PedidoService {
    pedido = this.getPedido();
    // pedido: PedidoJson = {
    //     accessories: {
    //         aparador_aluminio: false,
    //         aparador_inox: true,
    //         selante: true,
    //     },
    //     balcony: {
    //         aluminium: {
    //             color: {
    //                 black: false,
    //                 bz1001: false,
    //                 bz1002: false,
    //                 bz1003: false,
    //                 mat: false,
    //                 white: true,
    //                 other: null,
    //             },
    //         },
    //         aperture: {
    //             inside: true,
    //             locations: [
    //                 {
    //                     distribution: '1 a 11',
    //                     door_distance: '40',
    //                     glasses: '11',
    //                     piece: '1',
    //                     stacking: 'À Esquerda',
    //                     tip: 'Abertura',
    //                 },
    //                 {
    //                     distribution: '12 a 15',
    //                     door_distance: '40',
    //                     glasses: '4',
    //                     piece: '1',
    //                     stacking: 'À Direita',
    //                     tip: 'Abertura',
    //                 },
    //             ],
    //             outside: false,
    //         },
    //         beam: {
    //             position: {
    //                 aligned: true,
    //                 inside: false,
    //                 outside: false,
    //             },
    //         },
    //         dimensions: {
    //             data: [
    //                 ['1', '90', '6310', '11'],
    //                 ['2', '90', '2005', '4'],
    //             ],
    //             total: '',
    //         },
    //         glass: {
    //             color: {
    //                 bronze: false,
    //                 colorless: false,
    //                 green: false,
    //                 tinted: false,
    //                 other: null,
    //             },
    //             laminated: false,
    //             tempered: true,
    //             thickness: {
    //                 '10mm': false,
    //                 '8mm': true,
    //             },
    //         },
    //         levels: {
    //             full_aperture: '1080',
    //             measures: {
    //                 data: [['1000', '80']],
    //                 highest_ceiling: '1000',
    //                 highest_floor: '80',
    //                 lower_ceiling: '1000',
    //                 lower_floor: '80',
    //             },
    //         },
    //         lock: {
    //             fechadura_para_porta: false,
    //             fechadura_vidro_vidro: true,
    //         },
    //         plumb: {
    //             left_wall: {
    //                 bottom: '0',
    //                 top: '0',
    //             },
    //             right_wall: {
    //                 bottom: '0',
    //                 top: '0',
    //             },
    //         },
    //         rails: {
    //             lower_rail: {
    //                 built_in: {
    //                     ref: {
    //                         A: false,
    //                         B: false,
    //                         C: false,
    //                         other: false,
    //                     },
    //                     tip: {
    //                         A: false,
    //                         B: false,
    //                         C: false,
    //                         D: false,
    //                     },
    //                 },
    //                 normal: {
    //                     tip: {
    //                         A: false,
    //                         B: false,
    //                         C: false,
    //                         other: false,
    //                     },
    //                 },
    //                 tab: {
    //                     inside: false,
    //                     outside: false,
    //                     tip: {
    //                         A: false,
    //                         B: false,
    //                         C: false,
    //                         D: false,
    //                         E: false,
    //                     },
    //                 },
    //                 tip: {
    //                     built_in: false,
    //                     normal: true,
    //                     tab: false,
    //                 },
    //             },
    //             upper_rail: {
    //                 tab: {
    //                     inside: false,
    //                     outside: false,
    //                 },
    //                 tip: {
    //                     normal: true,
    //                     tab: false,
    //                 },
    //             },
    //         },
    //         tip: {
    //             better_adjustment: false,
    //             defined: {
    //                 glass_quantity: '15',
    //                 isDefined: true,
    //             },
    //         },
    //         format: 2,
    //     },
    //     client: {
    //         address: 'X',
    //         apartment: 'X',
    //         building: 'VIDROALTO',
    //         city: 'X',
    //         name: 'TRISSIA CHURRASQUEIRA',
    //         neighborhood: 'X',
    //         state: 'SC',
    //     },
    //     technician: 'solução sacadas - DENISE SOUZA',
    // };

    private observableDataSubject = new Subject<any>();

    activeIndex = this.getActiveIndex();

    constructor() {}

    notifyObservers(): void {
        this.observableDataSubject.next(this.pedido);
    }

    getObservable(): Subject<PedidoJson> {
        return this.observableDataSubject;
    }

    setPedido(pedido: PedidoJson) {
        localStorage.setItem('pedido', JSON.stringify(pedido));
    }

    getPedido(): PedidoJson {
        return JSON.parse(localStorage.getItem('pedido'));
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
    }
    prevTab(): void {
        if (this.activeIndex > 0) this.activeIndex -= 1;
        this.setActiveIndex(this.activeIndex);
        this.setPedido(this.pedido);
    }

    changeTab() {
        this.setActiveIndex(this.activeIndex);
        this.setPedido(this.pedido);
    }
}
