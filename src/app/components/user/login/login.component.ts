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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, FormsModule, PasswordModule, ButtonModule, CheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  keepLoggedIn: boolean =false;

  user:User = {
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
    private router: Router
  ){}

  login(){

    let data = {
      email: this.user.email,
      password: this.user.password
    }

    this.api.login('users', data).subscribe({
      next: (res)=>{
        this.auth.login((res as any).token);
        if (this.keepLoggedIn) {
          this.auth.storeUser((res as any).token);
        }
        alert('Sikeres belépés!');
        this.router.navigateByUrl('/home');
      },
      error: (err)=>{
        console.log(err);
        alert(err.error.error);
      }
    });
  }

}
