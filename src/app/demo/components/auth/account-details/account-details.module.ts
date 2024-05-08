import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { AccountDetailsComponent } from './account-details.component';
import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AccountDetailsRoutingModule,
        ButtonModule,
        FormsModule,
        ComponentsModule
    ],
    declarations: [AccountDetailsComponent]
})
export class AccountDetailsModule { }
