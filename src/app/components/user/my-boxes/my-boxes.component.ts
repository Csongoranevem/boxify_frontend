import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Box } from '../../../interfaces/box';


@Component({
  selector: 'app-my-boxes',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './my-boxes.component.html',
  styleUrl: './my-boxes.component.scss'
})
export class MyBoxesComponent {

  boxes: Box[] = [
    {
      id: 1,
      name: 'Doboz 1',
      size: 1,
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Doboz 2',
      size: 2,
      updatedAt: new Date()
    },
    {
      id: 3,
      name: 'Doboz 3',
      size: 3,
      updatedAt: new Date()
    }
  ];

}
