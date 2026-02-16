import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user';
import { ApiService } from '../../../services/api.service';
import { MessageService } from 'primeng/api';

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
    private router: Router,
    private message: MessageService

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
        this.message.add({ severity: 'success', summary: 'Siker', detail: 'Sikeres regisztráció! Bejelentkezhetsz!', life: 3000 });
        this.router.navigateByUrl('/login');
      },
      error: (err)=>{
        console.log(err);
        this.message.add({ severity: 'error', summary: 'Hiba', detail: `Sikertelen regisztráció: \n${err.error.error}`, life: 3000 });
      }
    });
  }

}
