import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, AdminRoutingModule, ComponentsModule],
})
export class AdminModule {}
