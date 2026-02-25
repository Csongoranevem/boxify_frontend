import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { FieldsetModule } from 'primeng/fieldset'; 
import { ButtonModule } from 'primeng/button';
import { Stepper, StepperModule } from 'primeng/stepper'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    OrganizationChartModule,
    FieldsetModule,
  ButtonModule,
  StepperModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

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
