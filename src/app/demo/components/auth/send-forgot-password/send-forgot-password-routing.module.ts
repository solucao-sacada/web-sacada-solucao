import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SendForgotPasswordComponent } from './send-forgot-password.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SendForgotPasswordComponent }
    ])],
    exports: [RouterModule]
})
export class SendForgotPasswordRoutingModule { }
