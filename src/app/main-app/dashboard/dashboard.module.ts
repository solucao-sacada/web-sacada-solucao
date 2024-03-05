import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { InfoPessoalComponent } from '../info-pessoal/info-pessoal.component';

@NgModule({
    declarations: [DashboardComponent],
    imports: [CommonModule, InfoPessoalComponent, DashboardRoutingModule, ComponentsModule],
})
export class DashboardModule {}
