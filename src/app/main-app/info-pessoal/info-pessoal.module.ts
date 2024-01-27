import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoPessoalRoutingModule } from './info-pessoal-routing.module';
import { InfoPessoalComponent } from './info-pessoal.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InfoPessoalComponent,
    InfoPessoalRoutingModule
  ]
})
export class InfoPessoalModule { }
