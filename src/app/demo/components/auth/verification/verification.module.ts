import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { VerificationComponent } from './verification.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        FormsModule,
        ComponentsModule
    ],
    declarations: [VerificationComponent]
})
export class VerificationModule { }
