import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { CalculoOrcamento, OrcamentoRequestModel } from 'src/app/models/orcamento';
import { Accessories } from 'src/app/models/pedidoJson';
import { AuthService } from 'src/app/services/auth.service';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
    selector: 'app-orcamento',
    templateUrl: './orcamento.component.html',
})
export class OrcamentoComponent {
    @ViewChild('resultado') resultadoSection: ElementRef;
    backgroundColor: string = 'white';
    activeIndex = 0;
    isCalculeted = false;
    total = 0;

    orcamentos: any[] = [];
    orcamento: CalculoOrcamento = new CalculoOrcamento();
    selected: CalculoOrcamento;
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    route = inject(ActivatedRoute);
    toaster = inject(ToasterService);
    orcamentoService = inject(OrcamentoService);
    router = inject(Router);
    selectedOrcamento: CalculoOrcamento | null = null;

    constructor(public pedidoService: PedidoService) {}

    ngOnInit() {
        this.load();
        this.route.params.subscribe((params) => {
            if (params['new']) {
                this.activeIndex = 1;
            }
        });
        this.pedidoService.pedido = this.pedidoService.intilizePedido();
    }
    // MÉTODOS CHECKBOXES
    onAparadorChange() {
        if (typeof this.orcamento.aparador === 'string' && this.orcamento.aparador === 'sem_aparador') {
            this.orcamento.qtdAparador = 0;
        }
    }

    private load() {
        this.orcamentoService.list().subscribe((orcamentos) => {
            console.log(orcamentos);
            this.orcamentos = orcamentos;
        });
    }

    onSubmit() {
        if (!this.orcamento.cliente) {
            this.toaster.warn('Por favor, preencha o campo Cliente');
            return;
        }

        if (!this.orcamento.ml) {
            this.toaster.warn('Por favor, preencha o campo Largura');
            return;
        }

        if (!this.orcamento.h) {
            this.toaster.warn('Por favor, preencha o campo Altura');
            return;
        }

        this.isCalculeted = true;
        setTimeout(() => {
            this.resultadoSection.nativeElement.scrollIntoView({
                behavior: 'smooth',
            });
        }, 50);
    }

    send() {
        if (!this.orcamento.valorFinal) {
            this.toaster.warn('Por favor, preencha defina um VALOR FINAL');
            return;
        }

        if (!this.orcamento.send) {
            this.toaster.warn('Por favor, preencha o campo E-MAIL');
            return;
        }
        this.orcamentoService
            .create({
                client: this.orcamento.cliente,
                emailClient: this.orcamento.send,
                idUser: this.auth.getUser()._id,
                price: this.orcamento.valorFinal,
                qtdAparador: this.orcamento.qtdAparador,
                qtdProlongador: this.orcamento.qtdProlongador,
                qtdSelante: this.orcamento.qtdSelante,
                selante: this.orcamento.selante,
                chapaInferior: this.orcamento.chapaInferior,
                chapaSuperior: this.orcamento.chapaSuperior,
                prolongador: this.orcamento.prolongador,
                aparador: this.orcamento.aparador,
            })
            .subscribe((response) => {
                this.toaster.success('Orcamento salvo com sucesso!');
                this.load();
                this.orcamento = new CalculoOrcamento();
                this.isCalculeted = false;
                this.activeIndex = 0;
            });
    }

    hiddeCalculeted() {
        this.isCalculeted = false;
    }

    gerarPedido(orcamento: OrcamentoRequestModel){
        const acessories = {
            client: orcamento.client,
            selante: orcamento.selante,
            aparador: orcamento.aparador,
            prolongador: orcamento.prolongador,
            aparador_aluminio: false,
            aparador_inox: orcamento.aparador ? true : false,
            sem_selante: orcamento.selante ? false : true,
            sem_aparador: orcamento.aparador ? false : true,
            qtdProlongador: orcamento.qtdProlongador,
            qtdAparador: orcamento.qtdAparador,
            qtdSelante: orcamento.qtdSelante,
        }

        localStorage.setItem('acessories', JSON.stringify(acessories));

        this.router.navigate(['/app/pedidos/novo']);
    }

    onSelectRow(value: any) {
        if (value.data._id) {
            this.orcamento = value.data;
            this.selectedOrcamento = value.data;
            this.activeIndex = 2;
        }
    }
}
