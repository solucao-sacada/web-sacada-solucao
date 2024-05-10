import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent {

  user: any = {
    password: '',
  }

  confirmPassword: string = '';

  private http = inject(Router);
  private authService = inject(AuthService);
  private toaster = inject(ToasterService);

  submitPasswordUpdate() {
    if (this.user.password !== this.confirmPassword) {
      this.toaster.error('As senhas precisam ser iguais!');
      return
    }
  }

}
