import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, ButtonModule],
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
  isDark = false;

  ngOnInit(): void {

    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      setTimeout(() => {
        this.setupMenu();
      }, 50);
      console.log('NavbarComponent: isLoggedIn changed to', isLoggedIn);
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
          label: 'Dobozaim',
          icon: 'pi pi-box',
          routerLink: '/myboxes'
        },
        {
          label: 'Statisztikák',
          icon: 'pi pi-chart-pie',
          routerLink: '/statistics'
        },
        {
          label: 'Naptár',
          icon: 'pi pi-calendar',
          routerLink: '/calendar'
        },
        {
          label: 'Profil',
          icon: 'pi pi-user-edit',
          routerLink: '/updateprofile'
        },
        {
          label: 'Kijelentkezés',
          icon: 'pi pi-sign-out',
          routerLink: '/logout'
        },
      ] : [
        {
          label: 'Bejelentkezés',
          icon: 'pi pi-sign-in',
          routerLink: '/login'
        },
        {
          label: 'Regisztráció',
          icon: 'pi pi-user-plus',
          routerLink: '/registration'
        }
      ]
    ]
  }

  createNewBox() {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('create_new_box');
    }
    else {
      this.router.navigateByUrl('login');
      alert('Kérjük, jelentkezzen be a doboz létrehozásához.');
    }
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element!.classList.toggle('my-app-dark');
    this.isDark = element!.classList.contains('my-app-dark');
  }
}
