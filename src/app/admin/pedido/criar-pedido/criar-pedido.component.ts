import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from 'src/app/models/pedido';
import { PedidoJson } from 'src/app/models/pedidoJson';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-criar-pedido',
    templateUrl: './criar-pedido.component.html',
    styles: [],
})
export class CriarPedidoComponent {
    form1: FormGroup = this._fb.group({
        nomeCliente: ['', Validators.required],
        CEP: [null, Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        apLojaCasa: ['', Validators.required],
        nomeEdificio: [''],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        idOrcamento: [''],
    });

    constructor(
        private _fb: FormBuilder,
        public pedidoService: PedidoService
    ) {}

    ngOnInit(): void {}

    print(): void {
        console.info(this.form1.getRawValue());
    }

    nextTab(): void {
        this.pedidoService.nextTab();
    }
    prevTab(): void {
        this.pedidoService.prevTab();
    }
}
