import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-pedido',
    templateUrl: './pedido.component.html',
    styles: [],
})
export class PedidoComponent implements OnInit {
    activeIndex: number = 0;

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

    constructor(private _fb: FormBuilder) {}

    ngOnInit(): void {}
}
