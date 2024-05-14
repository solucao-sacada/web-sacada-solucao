import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';


export interface UserUpdated {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  company?: {
    id: string;
    tradingName: string;
    legalName: string;
    cnpj: string;
    stateRegistration: string;
    streetAddress: string;
    num: number;
    complement: string;
    zipCode: number;
    neighborhood: string;
    city: string;
    state: string;
  } | null;
}

interface IUserData {
  user: User
}


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})

export class AccountDetailsComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

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

  userUpdate: UserUpdated = {} as UserUpdated

  visible: boolean = false;

  private router = inject(Router);
  private authService = inject(AuthService);
  private toaster = inject(ToasterService);

  ngOnInit() {
    this.loadUser();
  }

  updatePassword(){
    if(this.newPassword != this.confirmPassword ){
      this.toaster.error('As senhas precisam ser iguais!')
      return
    }

    const user = this.authService.getUser() as unknown as UserUpdated

    this.authService.resetPasswordUser(user.id, this.newPassword, this.oldPassword).subscribe({
      next: (data) => {
        console.log(data);
        this.toaster.success('Senha atualizada com sucesso!')
      },
      error: (error) => {
        if(error.message.includes('Campo inválido')){
          this.toaster.error('Minimo de 6 caracteres para a nova senha')
          return
        }
        this.toaster.error(error.message)
      }
    })
  }

  sendEmailVerification(): void {
    this.authService.verificationEmail(this.user.email).subscribe({
      next: (data) => {
        this.toaster.success('E-mail de verificação enviado. Verifique sua caixa de entrada!')
        console.log('E-mail de verificação enviado com sucesso', data);
      },
      error: (error) => {
        this.toaster.error('Erro ao enviar e-mail de verificação');
        console.error('Erro ao enviar e-mail de verificação', error);
      }
    })
}


  loadUser() {
    this.user = this.authService.getUser();
  }
  updateAccount() {
    this.authService.updateAccount(this.user).subscribe({
      next: (user) => { // retorno do backend que veio do service user
        const userDataDesestructured = user as unknown as IUserData
        this.userUpdate = {
          id: userDataDesestructured.user.id,
          name: userDataDesestructured.user.name,
          email: userDataDesestructured.user.email,
          phone: userDataDesestructured.user.phone,
          password: userDataDesestructured.user.password
        }

        this.authService.updateCompany(this.user.company).subscribe({
          next: (company) => {
            this.userUpdate = {
              ...this.userUpdate,
              company: {
                id: company._id as string,
                tradingName: company.tradingName,
                legalName: company.legalName,
                cnpj: company.cnpj,
                stateRegistration: company.stateRegistration,
                streetAddress: company.streetAddress,
                num: company.num,
                complement: company.complement,
                zipCode: company.zipCode,
                neighborhood: company.neighborhood,
                city: company.city,
                state: company.state
              }
            }
            this.authService.setUser(this.userUpdate as unknown as User);
            this.loadUser();
            this.toaster.success('Dados alterados com sucesso!');
          },
          error: () => {
            this.toaster.error('Erro ao alterar conta');
          }
        })
      },


      error: () => {
        this.toaster.error('Erro ao alterar conta');
      }
    })
  }

  handleDeleteAccount() {
    // Remover underline do id antes de enviar
    const userForDelete = {
      ...this.user,
      id: this.user.id, // Renomeia a chave _id para id
      _id: undefined // Remove a chave _id
    };
    console.log(userForDelete);
    this.authService.deleteUser(userForDelete.id).subscribe({
      next: () => {
        this.toaster.success('Conta excluída com sucesso!');
        localStorage.clear(); // Limpa o armazenamento local
        setTimeout(() => {
          this.router.navigate(['']); // Redireciona para a página de login após um pequeno intervalo
        }, 1000);
      },
      error: (err) => {
        console.error('Erro ao excluir conta:', err);
        this.toaster.error('Erro ao excluir conta, tente novamente mais tarde');
      }
    })
  }

  handleOpenModal() {
    this.visible = true
  }

  handleCancelModal() {
    this.visible = false
  }

}
