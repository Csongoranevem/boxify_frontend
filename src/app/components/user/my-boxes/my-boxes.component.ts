import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Box } from '../../../interfaces/box';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-my-boxes',
  standalone: true,
  imports: [TableModule, ButtonModule, DatePipe],
  templateUrl: './my-boxes.component.html',
  styleUrl: './my-boxes.component.scss'
})
export class MyBoxesComponent implements OnInit {

  constructor(
    private api: ApiService,
    private messageService: MessageService
  ) { }

  boxes: Box[] = [];

  ngOnInit() {
    this.loadBoxes();
  }

  loadBoxes() {
    this.api.readAll('boxes').subscribe({
      next: (data) => {
        this.boxes = data as Box[];
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: error.error.error, life: 3000 });
      }
    });
  }

}
