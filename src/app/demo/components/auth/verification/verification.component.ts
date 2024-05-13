import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styles: [],
})
export class VerificationComponent implements OnInit {
  msgs: Message[] = [];
  isActived = false;
  userAlreadyVerificated = false;
  constructor(
    private router: Router,
    private _activeRoute: ActivatedRoute,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    const user = this._auth.getUser();

    if (user && user.emailActive === true) {
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
    this.router.navigate(['/login']);
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.msgs = [];
    this.msgs.push({ severity, summary, detail });
  }
}
