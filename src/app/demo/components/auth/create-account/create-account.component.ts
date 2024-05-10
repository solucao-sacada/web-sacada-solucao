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

    if (
      !this.user.name ||
      !this.user.email ||
      !this.user.phone ||
      !this.user.password ||
      !this.user.company.tradingName ||
      !this.user.company.legalName ||
      !this.user.company.cnpj ||
      !this.user.company.stateRegistration ||
      !this.user.company.streetAddress ||
      !this.user.company.num ||
      !this.user.company.zipCode ||
      !this.user.company.neighborhood ||
      !this.user.company.city ||
      !this.user.company.state
    ) {
      this.toaster.error('Todos os campos precisam ser preenchidos!');
      return
    }
    this.authService.createAccount(this.user).subscribe({
      next: () => {
        this.toaster.success('Conta criada com sucesso!');
        setTimeout(() => {
            this.http.navigate(['']);
        }, 1100);
      },

      error: (error) => {
        this.toaster.error(error.message);
      }
    })
  }
}
