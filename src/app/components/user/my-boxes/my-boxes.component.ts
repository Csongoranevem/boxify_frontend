import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Box } from '../../../interfaces/box';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';
import { DatePipe } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-my-boxes',
  standalone: true,
  imports: [TableModule, ButtonModule, DatePipe, QRCodeModule, FormsModule, DialogModule],
  templateUrl: './my-boxes.component.html',
  styleUrl: './my-boxes.component.scss'
})
export class MyBoxesComponent implements OnInit {

  constructor(
    private api: ApiService,
    private messageService: MessageService
  ) { }

  boxes: Box[] = [];
  visible: boolean = false;

  selectedBox: Box = {
    id: '',
    userId: '',
    code: '',
    labelType: 'QR',
    lengthCm: 0,
    widthCm: 0,
    heightCm: 0,
    maxWeightKg: 0,
    location: '',
    note: '',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  ngOnInit() {
    this.loadBoxes();
  }

  loadBoxes() {
    this.api.selectAll('boxes').subscribe({
      next: (data) => {
        this.boxes = data as Box[];
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: err.message, life: 3000 });
      }
    });
  }

  updateBox(id: string) {
    if (!this.selectedBox) return;

    this.api.update('boxes', id, this.selectedBox).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Siker', detail: 'A doboz sikeresen frissítve' });
        this.loadBoxes();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: err.message });
      }
    });
  }


  showDialog(id: string) {
    this.selectedBox = this.boxes.find(box => box.id === id) || this.selectedBox;
    this.visible = true;
  }

  hideDialog() {
    this.selectedBox = {
      id: '',
      userId: '',
      code: '',
      labelType: 'QR',
      lengthCm: 0,
      widthCm: 0,
      heightCm: 0,
      maxWeightKg: 0,
      location: '',
      note: '',
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.visible = false;
  }


  deleteBox(id: string) {
    this.api.delete('boxes', id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Siker', detail: 'A doboz sikeresen törölve' });
        this.loadBoxes();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: err.message });
      }
    });
  }
}
