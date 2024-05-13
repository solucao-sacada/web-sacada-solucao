import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SendForgotPasswordComponent } from "./send-forgot-password.component";
import { ButtonModule } from "primeng/button";
import { ComponentsModule } from "src/app/components/components.module";
import { SendForgotPasswordRoutingModule } from "./send-forgot-password-routing.module";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SendForgotPasswordRoutingModule,
        ButtonModule,
        ComponentsModule,
    ],
    declarations: [SendForgotPasswordComponent]
})

export class SendForgotPasswordModule { }
