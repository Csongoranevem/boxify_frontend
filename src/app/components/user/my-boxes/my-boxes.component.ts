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
@Component({
  selector: 'app-my-boxes',
  standalone: true,
  imports: [TableModule, ButtonModule, DatePipe, QRCodeModule, FormsModule, DialogModule, InputText, TextareaModule, AutoCompleteModule],
  templateUrl: './my-boxes.component.html',
  styleUrl: './my-boxes.component.scss'
})
export class MyBoxesComponent implements OnInit {

  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private auth: AuthService
  ) { }

  items: Item[] = [];
  boxes: Box[] = [];
  visible: boolean = false;
  showEditItemDialogVisible: boolean = false;
  ItemsVisible: boolean = false;
  selectedItem: any = {
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
    this.api.selectByField('boxes', 'userId', 'eq', this.auth.GetLoggedUser().id).subscribe({
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

  getAllItems(boxId: string) {
    this.api.selectByField('items', 'boxId', 'eq', boxId).subscribe({
      next: (data) => {
        this.items = data as Item[];
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: err.message, life: 3000 });
      }
    });

    this.showItemsDialog();
  }

  showItemsDialog() {
    this.ItemsVisible = true;
  }

  hideItemsDialog() {
    this.ItemsVisible = false;
  }

  showEditItemDialog(itemId: string) {
    if (!itemId) this.selectedItem = { name: 'nem található tárgy!'};
    this.selectedItem = this.items.find(item => item.id === itemId) || this.selectedItem;
    this.showEditItemDialogVisible = true;
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
    this.showEditItemDialogVisible = false;
  }

  deleteItemFromBox(itemId: string) {
    this.api.update('items', itemId, { boxId: null }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Siker', detail: 'A tétel sikeresen törölve' });
        this.getAllItems(this.selectedBox.id);
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
        this.getAllItems(this.selectedBox.id);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: err.message });
      }
    });
  }
}
