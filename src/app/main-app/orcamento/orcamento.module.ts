import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { OrcamentoRoutingModule } from './orcamento-routing.module';
import { OrcamentoComponent } from './orcamento.component';
import { ComponentsModule } from 'src/app/components/components.module';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    OrcamentoComponent
  ],
  imports: [
    CommonModule,
    OrcamentoRoutingModule,
    ComponentsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class OrcamentoModule { }
