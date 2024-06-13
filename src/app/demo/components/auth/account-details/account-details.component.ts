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
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  user = {
    name: '',
    email: '',
    phone: '',
    password: '',
    company: {
      id: '',
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

  updatePassword() {
    if (this.newPassword != this.confirmPassword) {
      this.toaster.error('As senhas precisam ser iguais!')
      return
    }

    const user = this.authService.getUser() as unknown as UserUpdated

    this.authService.resetPasswordUser(user.id, this.newPassword, this.oldPassword).subscribe({
      next: (data) => {
        this.toaster.success('Senha atualizada com sucesso!')
      },
      error: (error) => {
        if (error.message.includes('Campo inválido')) {
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
      },
      error: (error) => {
        this.toaster.error('Erro ao enviar e-mail de verificação');
      }
    })
  }


  loadUser() {
    this.user = this.authService.getUser();
  }

  updateUser(user: User) {
    this.user = user
  }
  updateAccount() {
    const userStorage = this.authService.getUser();

    if (this.user.name !== userStorage.name ||
      this.user.email !== userStorage.email ||
      this.user.phone !== userStorage.phone
    ) {
      this.authService.updateAccount({
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
      }).subscribe({
        next: (user) => { // retorno do backend que veio do service user
          this.toaster.success('Informações do perfil alteradas com sucesso!');
          this.user = {
            ...this.user,
            name: user.name,
            email: user.email,
            phone: user.phone,
          }
          this.authService.setUser(this.user)
          this.loadUser()
        },
        error: (error) => {
          this.toaster.error('Erro ao alterar conta')
        }
      })
    } else {
      this.authService.updateCompany(this.user.company).subscribe({
        next: (company) => {
          this.toaster.success('Empresa alterada com sucesso!');
          this.user = {
            ...this.user,
            company: company
          }
          this.authService.setUser(this.user);
          this.loadUser();
        },
        error: () => {
          this.toaster.error('Erro ao alterar conta');
        }
      })
    }
  }

  handleDeleteAccount() {
    // Remover underline do id antes de enviar
    const userForDelete = {
      ...this.user,
      id: this.user.id, // Renomeia a chave _id para id
      _id: undefined // Remove a chave _id
    };
    this.authService.deleteUser(userForDelete.id).subscribe({
      next: () => {
        this.toaster.success('Conta excluída com sucesso!');
        localStorage.clear(); // Limpa o armazenamento local
        setTimeout(() => {
          this.router.navigate(['']); // Redireciona para a página de login após um pequeno intervalo
        }, 1000);
      },
      error: (err) => {
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

  togglePasswordVisibility(field: string): void {
    if (field === 'old') {
      this.showOldPassword = !this.showOldPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
