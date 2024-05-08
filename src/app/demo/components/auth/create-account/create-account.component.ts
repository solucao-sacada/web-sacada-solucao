import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  user: User = {
      name: '',
      email: '',
      phone: '',
      password: '',
      company: {
          tradingName: '',
          legalName: '',
          cnpj: '',
          stateRegistration: '',
          streetAddress: '',
          num: 0,
          complement: '',
          zipCode: 0,
          neighborhood: '',
          city: '',
          state: ''
      },
  } as User

  confirmPassword: string = '';

  private http = inject(Router);
  private authService = inject(AuthService);
  private toaster = inject(ToasterService);

  submitCreateAccount() {
    if (this.user.password !== this.confirmPassword) {
      this.toaster.error('As senhas precisam ser iguais!');
      return
    }

    this.authService.createAccount(this.user).subscribe({
      next: (response) => {
        console.log(response);
        this.toaster.success('Conta criada com sucesso!');
        setTimeout(() => {
            this.http.navigate(['']);
        }, 1000);
      },

      error: (error) => {
        console.log(error.error.message);
        this.toaster.error(error.error.message);
      }
    })
  }
}
