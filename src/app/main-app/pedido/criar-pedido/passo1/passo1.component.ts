import { take, finalize } from 'rxjs';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BuscaCepService } from 'src/app/services/busca-cep.service';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-passo1',
    templateUrl: './passo1.component.html',
    styles: [
        `
            @media (max-width: 576px) {
                ::ng-deep .selectBuilding .p-button-label {
                    font-size: 11px !important;
                }
            }
        `
    ],
})
export class Passo1Component implements OnInit {
    @ViewChild('numeroInput') numeroInput!: ElementRef;
    @ViewChild('cepInput') cepInput!: ElementRef;
    @Output() isOk = new EventEmitter();

    visible = false;

    constructor(
        private _buscaCep: BuscaCepService,
        private _loading: LoadingService,
        private _toaster: ToasterService,
        public pedidoService: PedidoService
    ) { }

    ngOnInit(): void { }


    onChangeCep() {
        let cep = this.pedidoService.pedido.client.zipCode as string;
        cep = cep.replace(/\D/g, ''); 
        if (cep.length === 8) { 
            this.buscaCep(cep); 
        }
    }
    
    buscaCep(cep: string) { // Alteramos o tipo do parâmetro para string
        console.log(cep);
        this._loading.start();
        this._buscaCep
            .buscaCep(cep) // Passa o CEP como número para a função buscaCep
            .pipe(
                take(1),
                finalize(() => this._loading.stop())
            )
            .subscribe((response) => {
                if (!response.erro) {
                    this.pedidoService.pedido.client.address = response.logradouro;
                    this.pedidoService.pedido.client.neighborhood = response.bairro;
                    this.pedidoService.pedido.client.city = response.localidade;
                    this.pedidoService.pedido.client.state = response.uf;
                    this.numeroInput.nativeElement.focus();
                } else {
                    this._toaster.warn('Cep não encontrado');
                }
            });
    }
    

    nextTab(): void {
        if (
            !this.pedidoService.pedido.client.name ||
            !this.pedidoService.pedido.client.address ||
            !this.pedidoService.pedido.client.num ||
            !this.pedidoService.pedido.client.apartment ||
            !this.pedidoService.pedido.client.neighborhood ||
            !this.pedidoService.pedido.client.city ||
            !this.pedidoService.pedido.client.state
        ) {
            this._toaster.warn(
                'Por favor preencha todos os campos obrigatórios'
            );
        } else this.pedidoService.nextTab();
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}





