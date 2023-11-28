import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from 'src/app/models/pedido';

@Component({
    selector: 'app-criar-pedido',
    templateUrl: './criar-pedido.component.html',
    styles: [],
})
export class CriarPedidoComponent {
    pedido: Pedido = {
        passo2: {
            better_adjustment: false,
            defined: {
                glass_quantity: null,
                isDefined: false,
            },
        },
        passo3: {
            cor_vidro: null,
            espessura_vidro: null,
            tipo_vidro: null,
            identificacao_cor: null,
        },
        passo4: {
            cor_aluminio: null,
            identificacao_cor: null,
        },
    };

    activeIndex: number = 2;
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

    print(): void {
        console.info(this.form1.getRawValue());
    }

    nextTab(): void {
        this.activeIndex += 1;
    }
    prevTab(): void {
        if (this.activeIndex > 0) this.activeIndex -= 1;
    }
}
