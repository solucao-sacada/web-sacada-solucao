import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { ToasterService } from 'src/app/components/toaster/toaster.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent implements OnInit {
    token: string = '';
    password: string = '';

    confirmPassword: string = '';

    private http = inject(Router);
    private authService = inject(AuthService);
    private toaster = inject(ToasterService);
    private activatedRoute = inject(ActivatedRoute);
    private ldService = inject(LoadingService);

    ngOnInit(): void {
        this.ldService.start();
      this.activatedRoute.queryParams.subscribe((queryParams) => {
        this.token = queryParams['token'];
        if (!this.token) this.http.navigate(['/']);
      });

      this.authService.verifyToken(this.token).subscribe({
        next: (value) => {
          if(!value) {
            this.http.navigate(['/']);
          }
          this.ldService.stop();
        },
        error: (err) => {
          this.ldService.stop();
          this.http.navigate(['/']);
        }
      })

    }
  submitPasswordUpdate() {
    if (this.password !== this.confirmPassword) {
      this.toaster.error('As senhas precisam ser iguais!');
      return
    }

    this.authService.resetPasswordByToken(this.token, this.password).subscribe({
      next: () => {
        this.toaster.success('Senha atualizada com sucesso!')
        this.http.navigate(['/']);
      },
      error: (err) => {
        if(err){
          this.toaster.error('Token inválido ou inexistente');
        }
      }
    })
  }

}
