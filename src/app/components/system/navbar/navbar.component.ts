import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) { }

  items: MenuItem[] | undefined;
  isLoggedIn: boolean = false;

  ngOnInit(): void {

    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      setTimeout(() => {
        this.setupMenu();
      }, 50);
    });

    if (this.isLoggedIn) {
      this.router.navigateByUrl('home');
    }

  }

  setupMenu() {

    this.items = [

      // always visible

      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home'
      },

      // isLoggedIn true or false

      ...(this.isLoggedIn) ? [
        {
          label: 'Users',
          icon: 'pi pi-users',
          routerLink: '/users'
        },
        {
          label: 'Worktimes',
          icon: 'pi pi-clock',
          routerLink: '/worktimes'
        },
        {
          label: 'Statistics',
          icon: 'pi pi-chart-pie',
          routerLink: '/statistics'
        },
        {
          label: 'Calendar',
          icon: 'pi pi-calendar',
          routerLink: '/calendar'
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          routerLink: '/logout'
        },
      ] : [
        {
          label: 'Login',
          icon: 'pi pi-sign-in',
          routerLink: '/login'
        },
        {
          label: 'Registration',
          icon: 'pi pi-user-plus',
          routerLink: '/registration'
        }
      ]
    ]
  }
}
