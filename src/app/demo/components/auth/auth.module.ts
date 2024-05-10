import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
    ],
    declarations: [
    
    ResetPasswordComponent
  ]
})
export class AuthModule { }
