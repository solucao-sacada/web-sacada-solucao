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

    ngOnInit(): void {
        if (this.pedidoService.getPedido()) {
            console.log('Pedido em elaboração');
        }
    }

    print(): void {
        console.info(this.form1.getRawValue());
    }

    nextTab(): void {
        this.pedidoService.nextTab();
    }
    prevTab(): void {
        this.pedidoService.prevTab();
    }

    p1_Ok: boolean = true;
    passo1_OK(value: boolean) {
        this.p1_Ok = !value;
    }
    p2_Ok: boolean = true;
    passo2_OK(value: boolean) {
        this.p2_Ok = !value;
    }
    p3_Ok: boolean = true;
    passo3_OK(value: boolean) {
        this.p3_Ok = !value;
    }
    p4_Ok: boolean = true;
    passo4_OK(value: boolean) {
        this.p4_Ok = !value;
    }
    p5_Ok: boolean = true;
    passo5_OK(value: boolean) {
        this.p5_Ok = !value;
    }
    p6_Ok: boolean = true;
    passo6_OK(value: boolean) {
        this.p6_Ok = !value;
    }
    p7_Ok: boolean = true;
    passo7_OK(value: boolean) {
        this.p7_Ok = !value;
    }
    p8_Ok: boolean = true;
    passo8_OK(value: boolean) {
        this.p8_Ok = !value;
    }
    p9_Ok: boolean = true;
    passo9_OK(value: boolean) {
        this.p9_Ok = !value;
    }
    p10_Ok: boolean = true;
    passo10_OK(value: boolean) {
        this.p10_Ok = !value;
    }
    p11_Ok: boolean = true;
    passo11_OK(value: boolean) {
        this.p11_Ok = !value;
    }
    p12_Ok: boolean = true;
    passo12_OK(value: boolean) {
        this.p12_Ok = !value;
    }
    p13_Ok: boolean = true;
    passo13_OK(value: boolean) {
        this.p13_Ok = !value;
    }
}
