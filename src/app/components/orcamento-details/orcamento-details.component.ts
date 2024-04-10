import { Component, Input, OnInit } from '@angular/core';
import { OrcamentoRequestModel } from 'src/app/models/orcamento';
import { OrcamentoService } from 'src/app/services/orcamento.service';

@Component({
    selector: 'app-orcamento-details',
    templateUrl: './orcamento-details.component.html',
    styleUrls: ['./orcamento-details.component.scss'],
})
export class OrcamentoDetailsComponent {
    qtdLinhasDim: number;
    linhas: any[];
    constructor(
        public orcamentoService: OrcamentoService,
    ) {}

    @Input() set Orcamento(value: OrcamentoRequestModel) {
        this.orcamento = value;
    }

    orcamento: OrcamentoRequestModel;

}
