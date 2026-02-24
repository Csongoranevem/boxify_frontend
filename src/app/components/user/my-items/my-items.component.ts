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
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { AuthService } from '../../../services/auth.service';
import { Item } from '../../../interfaces/Item';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-my-items',
  standalone: true,
  imports: [TableModule, ButtonModule, DatePipe, QRCodeModule, FormsModule, DialogModule, InputText, TextareaModule, AutoCompleteModule, SelectModule],
  templateUrl: './my-items.component.html',
  styleUrl: './my-items.component.scss'
})
export class MyItemsComponent implements OnInit {

  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private auth: AuthService,
  ) { }

  items: Item[] = [];
  boxes: Box[] = [];
  visible: boolean = false;
  selectedItem: Item = {
    id: '',
    userId: '',
    boxId: '',
    name: '',
    description: '',
    category: '',
    lengthCm: 0,
    widthCm: 0,
    heightCm: 0,
    weightKg: 0,
    imagePath: ''
  };

  ngOnInit() {
    this.loadBoxes();
    this.getAllItems();
  }

  loadBoxes() {
    this.api.selectByField('boxes', 'userId', 'eq', this.auth.GetLoggedUser().id).subscribe({
      next: (data) => {
        this.boxes = data as Box[];
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: err.message, life: 3000 });
      }
    });
  }


  showDialog(id: string) {
    this.selectedItem = this.items.find(item => item.id === id) || this.selectedItem;
    this.visible = true;
  }

  hideDialog() {
    this.selectedItem = {
      id: '',
      userId: '',
      boxId: '',
      name: 'QR',
      category: '',
      lengthCm: 0,
      widthCm: 0,
      heightCm: 0,
      weightKg: 0,
      description: '',
      imagePath: ''
    };
    this.visible = false;
  }


  getAllItems() {
    this.api.selectByField('items', 'userId', 'eq', this.auth.GetLoggedUser().id).subscribe({
      next: (data) => {
        this.items = data as Item[];
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: err.message, life: 3000 });
      }
    });
  }



  hideEditItemDialog() {
    this.selectedItem = {
      id: '',
      userId: '',
      boxId: '',
      name: '',
      description: '',
      category: '',
      lengthCm: 0,
      widthCm: 0,
      heightCm: 0,
      weightKg: 0,
      imagePath: ''
    };
  }

  deleteItem(itemId: string) {
    this.api.delete('items', itemId).subscribe({
      next: () => {
        this.getAllItems();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: err.message });
      }
    });
  }


  updateItem(itemId: string) {
    if (!this.selectedItem) return;

    this.api.update('items', itemId, this.selectedItem).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Siker', detail: 'A tétel sikeresen frissítve' });
        this.getAllItems();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: err.message });
      }
    });
  }

  onBoxChange(item: any, selectedBox: any): void {
    if (!selectedBox) return;
    this.api.update('items', item.id, { ...item, boxId: selectedBox.id }).subscribe({
      next: () => {
        item.boxId = selectedBox.id;
      },
      error: (err: any) => {
        console.error('Failed to update item box', err);
      }
    });
  }
}
