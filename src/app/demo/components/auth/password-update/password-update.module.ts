import { CommonModule } from '@angular/common';
import { PasswordUpdateComponent } from './password-update.component';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ComponentsModule } from 'src/app/components/components.module';
import { PasswordUpdateRoutingModule } from './password-update-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PasswordUpdateRoutingModule,
        ButtonModule,
        ComponentsModule,
    ],
    declarations: [PasswordUpdateComponent],
})

export class PasswordUpdateModule { }
