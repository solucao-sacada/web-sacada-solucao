import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { CalculoOrcamento } from 'src/app/models/orcamento';

@Component({
    selector: 'app-orcamento',
    templateUrl: './orcamento.component.html',
})
export class OrcamentoComponent {
    @ViewChild('resultado') resultadoSection: ElementRef;
    activeIndex = 0;
    isCalculeted = false;
    orcamento1 = new CalculoOrcamento();
    orcamento2 = new CalculoOrcamento();

    orcamentos: CalculoOrcamento[] = [];
    orcamento: CalculoOrcamento = new CalculoOrcamento();
    selected: CalculoOrcamento;
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    toaster = inject(ToasterService);

    ngOnInit() {
        this.orcamento1.cliente = 'Gustavo';
        this.orcamento1.valorFinal = 2250;
        this.orcamento1.send = 'email@teste.com';
        this.orcamento2.cliente = 'Kaio';
        this.orcamento2.valorFinal = 5325;
        this.orcamento2.send = 'email@teste.com';

        this.orcamentos = [this.orcamento1, this.orcamento2];

        this.route.params.subscribe((params) => {
            if(params['new']) {
                this.activeIndex = 1
            }
        })
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
        console.log(this.orcamento);
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

        this.orcamentos.push(this.orcamento);
        this.orcamento = new CalculoOrcamento();
        this.isCalculeted = false;
        this.activeIndex = 0;
    }
}
