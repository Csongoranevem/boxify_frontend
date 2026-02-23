import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';

import { CheckboxModule } from 'primeng/checkbox';
import { User } from '../../../interfaces/user';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, FormsModule, PasswordModule, ButtonModule, CheckboxModule, Toast, Ripple],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  keepLoggedIn: boolean = false;

  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: '',
    secret: '',
    reg: new Date(),
    status: false
  }

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private message: MessageService
  ) { }


  getUserId() {
    this.api.readByField('users', 'email', "eq", this.user.email).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        console.log('User data stored in localStorage:', user);
      }
    });
  }

  login() {


    let data = {
      email: this.user.email,
      password: this.user.password
    }

    this.api.login('users', data).subscribe({
      next: (res) => {
        this.auth.login((res as any).token);
        sessionStorage.setItem("id", (res as any).userId);
        if (this.keepLoggedIn) {
          this.auth.storeUser((res as any).token);
        }

        this.message.add({ severity: 'success', summary: 'Siker', detail: 'Sikeres bejelentkezés', life: 3000 });
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.message.add({ severity: 'error', summary: 'Hiba', detail: `Sikertelen bejelentkezés: \n${err.error.error}`, life: 3000 });
      }
    });

    this.getUserId();
  }



}
