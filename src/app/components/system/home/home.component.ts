import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { FieldsetModule } from 'primeng/fieldset'; 
import { ButtonModule } from 'primeng/button';
import { Stepper, StepperModule } from 'primeng/stepper'; 
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    OrganizationChartModule,
    FieldsetModule,
  ButtonModule,
  StepperModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // simple UI stats (animated)
  boxesCount: number = 0;
  itemsCount: number = 0;
  usersCount: number = 0;

  constructor(private router: Router, private api: ApiService, private auth: AuthService){}

  ngOnInit(): void {
    this.loadStats();
  }

  navigateTo(path: string){
    this.router.navigate([path]);
  }

  private loadStats(){
    // Try public endpoints first, fallback to demo numbers on error
    this.api.readAll('boxes').subscribe((res: any) => {
      const count = Array.isArray(res) ? res.length : (res && res.count) || 0;
      this.countTo('boxesCount', count);
    }, () => this.countTo('boxesCount', 12));

    this.api.readAll('items').subscribe((res: any) => {
      const count = Array.isArray(res) ? res.length : (res && res.count) || 0;
      this.countTo('itemsCount', count);
    }, () => this.countTo('itemsCount', 34));

    this.api.readAll('users').subscribe((res: any) => {
      const count = Array.isArray(res) ? res.length : (res && res.count) || 0;
      this.countTo('usersCount', count);
    }, () => this.countTo('usersCount', 3));
  }

  private countTo(prop: 'boxesCount' | 'itemsCount' | 'usersCount', target: number){
    target = Math.max(0, Math.floor(target));
    const duration = 800;
    const frameTime = 30;
    const steps = Math.max(1, Math.ceil(duration / frameTime));
    const increment = Math.max(1, Math.floor(target / steps));
    let current = 0;
    const key = prop as any;
    const id = setInterval(() => {
      current += increment;
      if (current >= target){
        (this as any)[key] = target;
        clearInterval(id);
      } else {
        (this as any)[key] = current;
      }
    }, frameTime);
  }

  data: TreeNode[] = [
    {
      expanded: true,
      type: 'person',
      styleClass: '!bg-indigo-100 !text-indigo-900 rounded-xl',
      data: {
        image: 'warrior.jpg',
        name: 'Bongor',
        title: 'Programmer, co-founder',
      },

      children: [
        {
          label: 'Frontend komponensek',
          styleClass: 'bg-purple-100 text-purple-900 rounded-xl',
        },
        {
          label: 'Validációk',
          styleClass: 'bg-purple-100 text-purple-900 rounded-xl',
        },
      ],
    },


  ];


  data2: TreeNode[] = [
    {
      expanded: true,
      type: 'person',
      styleClass: '!bg-indigo-100 !text-indigo-900 rounded-xl',
      data: {
        image: 'spoh.jpg',
        name: 'FZ',
        title: 'Programmer, co-founder',
      },
      children: [
        {
          label: 'Backend kommunikáció',
          styleClass: 'bg-green-100 text-green-900 rounded-xl',
        },
        {
          label: 'Főoldal, felhasználó-kezelés',
          styleClass: 'bg-green-100 text-green-900 rounded-xl',
        },
      ],
    }
  ]


}
