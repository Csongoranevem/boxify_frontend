import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})

export class LogoutComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private message: MessageService

  ) { }

  ngOnInit(): void {
    this.auth.logout();
    this.message.add({ severity: 'success', summary: 'Siker', detail: 'Sikeres kijelentkezés', life: 3000 });
    this.router.navigateByUrl('login');
  }

}
