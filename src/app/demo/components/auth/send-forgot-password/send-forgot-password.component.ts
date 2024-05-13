import { Component, inject } from '@angular/core';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-send-forgot-password',
  templateUrl: './send-forgot-password.component.html',
  styleUrls: ['./send-forgot-password.component.scss']
})

export class SendForgotPasswordComponent {

  private authService = inject(AuthService);
  private toaster = inject(ToasterService);

  email: string = '';


  sendResetPassword() {
    this.authService.sendLinkResetPassword(this.email,).subscribe({
      next: () => {
        this.toaster.success('Um e-mail de redefinição de senha foi enviado para ' + this.email);
        this.email = '';
      },
      error: (err) => {
        if(err){
          this.toaster.error('E-mail inválido ou inexistente');
        }
      }
    });
  }
}
