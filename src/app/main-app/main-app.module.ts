import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppRoutingModule } from './main-app-routing.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, MainAppRoutingModule, ComponentsModule],
})
export class MainAppModule {}
