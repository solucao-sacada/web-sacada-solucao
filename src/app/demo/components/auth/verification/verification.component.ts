import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
  msgs: Message[] = [];
  isActived = false;
  userAlreadyVerificated = false;


  private router = inject(Router);
  private _auth = inject(AuthService);
  private _activeRoute = inject(ActivatedRoute);


  ngOnInit(): void {
    const user = this._auth.getUser();

    if (user.emailActive) {
      this.router.navigate(['/']);
      return;
    }

    const email = this._activeRoute.snapshot.paramMap.get('email') || '';
    const token = this._activeRoute.snapshot.paramMap.get('token') || '';

    this._auth.validateAccount(email, token).subscribe((data) => {
      // atualizar email active dentro do localstorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.emailActive = true;
      localStorage.setItem('user', JSON.stringify(user));
      this.isActived = true;
    });
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.msgs = [];
    this.msgs.push({ severity, summary, detail });
  }
}
