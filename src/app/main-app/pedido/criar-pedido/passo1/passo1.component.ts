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
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

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

    visible = false;
    user: User = {} as User;

    constructor(
        private _buscaCep: BuscaCepService,
        private _loading: LoadingService,
        private _toaster: ToasterService,
        public pedidoService: PedidoService,
        private _auth: AuthService
    ) { }

    ngOnInit(): void {
        this.user = this._auth.getUser();
    }

    onChangeCep() {
        let cep = this.pedidoService.pedido.client.zipCode as string;
        cep = cep.replace(/\D/g, '');
        if (cep.length === 8) {
            this.buscaCep(cep);
        }
    }

    buscaCep(cep: string) { // Alteramos o tipo do parâmetro para string
        this._loading.start();
        this._buscaCep
            .buscaCep(cep) // Passa o CEP como número para a função buscaCep
            .pipe(
                take(1),
                finalize(() => this._loading.stop())
            )
            .subscribe({
                next: (response) => {
                    if(response.erro){
                        this._toaster.warn('CEP não encontrado');
                        return
                    }
                    this.pedidoService.pedido.client.address = response.logradouro;
                    this.pedidoService.pedido.client.neighborhood = response.bairro;
                    this.pedidoService.pedido.client.city = response.localidade;
                    this.pedidoService.pedido.client.state = response.uf;
                    this.numeroInput.nativeElement.focus();
                },
                error: () => this._toaster.error('Error ao consultar CEP'),
            });
    }

    showMessageDraft() {
        this.visible = true
    }
    naoContinuar(): void {
        this.visible = false
    }

    simContinuar(): void {
        this.nextTab()
        this.visible = false
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
        } else {
            this.pedidoService.nextTab();
        }
    }

    prevTab(): void {
        this.pedidoService.prevTab();
    }
}





