import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CreateAccountRoutingModule } from './create-account-routing.module';
import { CreateAccountComponent } from './create-account.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
    imports: [
        CommonModule,
        CreateAccountRoutingModule,
        ButtonModule,
        FormsModule,
        ComponentsModule
    ],
    declarations: [CreateAccountComponent]
})
export class CreateAccountModule { }
