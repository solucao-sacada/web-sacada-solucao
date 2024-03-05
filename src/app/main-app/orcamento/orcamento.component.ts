import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { CalculoOrcamento } from 'src/app/models/orcamento';
import { AuthService } from 'src/app/services/auth.service';
import { OrcamentoService } from 'src/app/services/orcamento.service';

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

    orcamentos: any[] = [];
    orcamento: CalculoOrcamento = new CalculoOrcamento();
    selected: CalculoOrcamento;
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    route = inject(ActivatedRoute);
    toaster = inject(ToasterService);
    orcamentoService = inject(OrcamentoService);

    ngOnInit() {
        this.load();

        this.route.params.subscribe((params) => {
            if (params['new']) {
                this.activeIndex = 1;
            }
        });
    }
    private load() {
        this.orcamentoService.list().subscribe((orcamentos) => {
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
        this.orcamentoService
            .create({
                client: this.orcamento.cliente,
                emailClient: this.orcamento.send,
                idUser: this.auth.getUser()._id,
                price: this.orcamento.valorFinal,
            })
            .subscribe((response) => {
                this.toaster.success('Orcamento salvo com sucesso!');
                this.load();
                this.orcamento = new CalculoOrcamento();
                this.isCalculeted = false;
                this.activeIndex = 0;
            });
    }
}
