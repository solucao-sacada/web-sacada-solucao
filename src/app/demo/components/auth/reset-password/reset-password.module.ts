import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ResetPasswordComponent } from "./reset-password.component";
import { ResetPasswordRoutingModule } from "./reset-password-routing.module";
import { ButtonModule } from "primeng/button";
import { ComponentsModule } from "src/app/components/components.module";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ResetPasswordRoutingModule,
        ButtonModule,
        ComponentsModule,
    ],
    declarations: [ResetPasswordComponent]
})

export class ResetPasswordModule { }