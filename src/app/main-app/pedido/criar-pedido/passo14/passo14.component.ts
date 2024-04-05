import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { PedidoService } from './../../../../services/pedido.service';
import { Component } from '@angular/core';
import { MESSAGES } from 'src/app/main-app/utils/messages';

@Component({
    selector: 'app-passo14',
    templateUrl: './passo14.component.html',
    styles: [],
})
export class Passo14Component {
    constructor(
        public pedidoService: PedidoService,
        private _toaster: ToasterService
    ) { }

    ngOnInit() {
        this.pedidoService.getObservable().subscribe(() => {
            if (this.pedidoService.pedido.balcony.lock.pvc)
                this.selectedVidro = 'PVC';
            else if (this.pedidoService.pedido.balcony.lock.ferro)
                this.selectedVidro = 'FERRO';
            if (this.pedidoService.pedido.balcony.lock['1520/1531'])
                this.selectedPorta = '1520/1531';
            else if (this.pedidoService.pedido.balcony.lock['3210/3211'])
                this.selectedPorta = '3210/3211';
        });
    }

    selectedVidro: string = '';
    selectedPorta: string = '';
    selected: string = '';
    selectedOption: string = '';

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
        this.selectedVidro = option.name;
    }

    selectPorta(option: any) {
        this.pedidoService.pedido.balcony.lock['1520/1531'] = option.code === 1;
        this.pedidoService.pedido.balcony.lock['3210/3211'] = option.code === 2;
        this.selectedPorta = option.name;
    }

    toggleSelection(optionName: string): void {
        this.selectedOption = optionName;
        this.selected = optionName;

        if (optionName.includes('PVC')) {
            this.pedidoService.pedido.balcony.lock.pvc = true;
            this.pedidoService.pedido.balcony.lock.ferro = false; 
        } else if(optionName.includes('FERRO')) {
                this.pedidoService.pedido.balcony.lock.ferro == true;
                this.pedidoService.pedido.balcony.lock.pvc == false;
            }

        if (optionName.includes('1520/1531')) {
            this.pedidoService.pedido.balcony.lock['1520/1531'] == true;
            this.pedidoService.pedido.balcony.lock['3210/3211'] == false;
        } else if (optionName.includes('3210/3211')) {
            this.pedidoService.pedido.balcony.lock['3210/3211'] == true;
            this.pedidoService.pedido.balcony.lock['1520/1531'] == false;
        }
    }
    nextTab(): void {
        const option = this.pedidoService.pedido.balcony.lock;
        if (option.fechadura_para_porta || option.fechadura_vidro_vidro) {
            if (option.pvc || option.ferro) {
                this.pedidoService.nextTab();
            } else if (option['1520/1531'] || option['3210/3211']) {
                this.pedidoService.nextTab();
            } else {
                this._toaster.warn(MESSAGES.UMA_OPCAO);
            }
        } else {
            this._toaster.warn(MESSAGES.UMA_OPCAO);
        }
    }
    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
