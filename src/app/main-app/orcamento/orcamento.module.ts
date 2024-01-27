import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentoRoutingModule } from './orcamento-routing.module';
import { OrcamentoComponent } from './orcamento.component';


@NgModule({
  declarations: [
    OrcamentoComponent
  ],
  imports: [
    CommonModule,
    OrcamentoRoutingModule
  ]
})
export class OrcamentoModule { }
