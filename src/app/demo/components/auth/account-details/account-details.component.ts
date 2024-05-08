import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent {

  user = {
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
    }
  } as User

  confirmPassword: string = '';

  private http = inject(Router);
  private authService = inject(AuthService);
  private toaster = inject(ToasterService);

  ngOnInit() {
    this.user = this.authService.getUser();
  }
  submit() {
    const userForUpdate = {
      ...this.user,
      id: this.user._id, // Renomeia a chave _id para id
      _id: undefined // Remove a chave _id
  };
  console.log(userForUpdate); 
    this.authService.updateAccount(userForUpdate).subscribe({
      next: () => {
        this.toaster.success('Conta alterada com sucesso');
        this.http.navigate(['/']);
      },
      error: () => {
        this.toaster.error('Erro ao alterar conta');
      }
    })
  }
}
