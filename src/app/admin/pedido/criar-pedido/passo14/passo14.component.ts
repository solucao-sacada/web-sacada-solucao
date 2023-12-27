import { PedidoService } from './../../../../services/pedido.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-passo14',
    templateUrl: './passo14.component.html',
    styles: [],
})
export class Passo14Component {
    constructor(public pedidoService: PedidoService) {}

    ngOnInit() {
        this.pedidoService.getObservable().subscribe(() => {
            if (this.pedidoService.pedido.balcony.lock.pvc)
                this.selected = 'PVC';
            else if (this.pedidoService.pedido.balcony.lock.ferro)
                this.selected = 'FERRO';
            else if (this.pedidoService.pedido.balcony.lock['1520/1531'])
                this.selected = '1520/1531';
            else if (this.pedidoService.pedido.balcony.lock['3210/3211'])
                this.selected = '3210/3211';
        });
    }

    selected: string = '';

    optionsVidro: any[] = [
        {
            code: 1,
            name: 'PVC',
            image: '../../../../../assets/img/13-fechaduras/pvc.jpg',
        },
        {
            code: 2,
            name: 'FERRO',
            image: 'https://placehold.co/600x400',
        },
    ];

    optionsPorta: any[] = [
        {
            code: 1,
            name: '1520/1531',
            image: '../../../../../assets/img/13-fechaduras/1520-1531.jpg',
        },
        {
            code: 2,
            name: '3210/3211',
            image: '../../../../../assets/img/13-fechaduras/3210-3211.jpg',
        },
    ];

    changeTip(value: string) {
        if (value === 'vidro') {
            this.pedidoService.pedido.balcony.lock.fechadura_para_porta = false;
            this.pedidoService.pedido.balcony.lock.fechadura_vidro_vidro = true;
        } else {
            this.pedidoService.pedido.balcony.lock.fechadura_para_porta = true;
            this.pedidoService.pedido.balcony.lock.fechadura_vidro_vidro =
                false;
        }
    }

    selectVidro(option: any) {
        this.pedidoService.pedido.balcony.lock.pvc = option.code === 1;
        this.pedidoService.pedido.balcony.lock.ferro = option.code === 2;
        this.selected = option.name;
    }

    selectPorta(option: any) {
        this.pedidoService.pedido.balcony.lock['1520/1531'] = option.code === 1;
        this.pedidoService.pedido.balcony.lock['3210/3211'] = option.code === 2;
        this.selected = option.name;
    }

    nextTab(): void {
        this.pedidoService.nextTab();
    }
    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
