import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, FormsModule, PasswordModule, ButtonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent implements OnInit {

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
    private router: Router
  ){}

  ngOnInit(): void {

  }

  save(){

    let data = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      confirm: this.user.confirm,
      phone: '',
      address: ''
    }

    this.api.registration('users', data).subscribe({
      next: (_res)=>{
        alert('Sikeres regisztráció! Bejelentkezhetsz!');
        this.router.navigateByUrl('/login');
      },
      error: (err)=>{
        console.log(err);
        alert(err.error.error);
      }
    });
  }

}
