import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-progressbar',
  standalone: true,
  imports: [ProgressBarModule],
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.scss'
})

export class ProgressbarComponent {

}
