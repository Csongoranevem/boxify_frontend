import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Item } from '../../../interfaces/Item';
import { Box } from '../../../interfaces/box';
import { SelectModule } from 'primeng/select';
import { QRCodeModule } from 'angularx-qrcode';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [InputTextModule, InputNumberModule, FormsModule, FloatLabelModule, ButtonModule, CommonModule, MessageModule, TextareaModule, SelectModule, QRCodeModule, ProgressBarModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss'

})
export class NewItemComponent implements OnInit {

  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private router: Router,
    private auth: AuthService
  ) { }

  userId: string = '';
  boxes: Box[] = [];
  boxCodes: string[] = [];
  selectedBox: Box | null = null;
  itemsWeight: number = 0;

  newItem: Item = {
    id: '',
    boxId: '',
    userId: '',
    name: '',
    description: '',
    category: '',
    lengthCm: 0,
    widthCm: 0,
    heightCm: 0,
    weightKg: 0,
    imagePath: '',
  };

  ngOnInit() {
    this.loadBoxes();
  }


  createItem() {

    let boxWeight = this.selectedBox?.maxWeightKg || 0;
    let boxVolume = (this.selectedBox?.lengthCm || 0) * (this.selectedBox?.widthCm || 0) * (this.selectedBox?.heightCm || 0);
    let itemVolume = this.newItem.lengthCm * this.newItem.widthCm * this.newItem.heightCm;
    this.newItem.userId = sessionStorage.getItem("id") || '';
    let fullSize = this.newItem.lengthCm * this.newItem.widthCm * this.newItem.heightCm;
    this.newItem.boxId = this.selectedBox?.id!;

    try {
      console.log('item volume:', itemVolume);
      console.log('item weight:', this.newItem.weightKg);
      console.log('box volume:', boxVolume);
      console.log('box weight:', boxWeight);
      if (!this.newItem.name || fullSize == 0) {
        throw new Error('Kérem, adjon meg minden szükséges adatot');
      }
      if (itemVolume > 10000000 || itemVolume > boxVolume) {
        throw new Error('A termék mérete túl nagy');
      }
      if (this.newItem.heightCm < 0 || this.newItem.lengthCm < 0 || this.newItem.widthCm < 0) {
        throw new Error('Nem adhatsz meg negatív méretet');
      }
      if (this.newItem.weightKg < 0 || this.newItem.weightKg > boxWeight) {
        throw new Error('A termék súlya érvénytelen');
      }
      if (!this.BoxWeightValidate()) {
        throw new Error('A doboz túl kicsi a termék számára');
      }

      this.api.insert('items', this.newItem).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Siker', detail: 'A termék sikeresen létrejött' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Hiba', detail: error.message });
        }
      });

      this.newItem = {
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
        imagePath: '',
      };
    }
    catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Hiba', detail: error.message });
    }
  }
  
  loadBoxes() {
    this.api.selectByField('boxes', 'userId', 'eq', this.auth.GetLoggedUser().id).subscribe({
      next: (data) => {
        this.boxes = data as Box[];
        this.boxCodes = this.boxes.map(box => box.code);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: err.message, life: 3000 });
      }
    });
  }

  BoxWeightValidate(): boolean {
    let boxWeight = this.selectedBox?.maxWeightKg || 0;
    if (this.newItem.weightKg < 0 || this.newItem.weightKg > boxWeight || this.itemsWeight + this.newItem.weightKg > boxWeight) {
      return false;
    }
    return true;
  }

  GetBoxItemsWeight() {
    this.api.selectByField('items', 'boxId', 'eq', this.selectedBox?.id!).subscribe({
      next: (data) => {
        let items = data as Item[];
        let totalWeight: number = 0;
        if (items.length != 0) {
          items.forEach(item => {
            let itemWeight: number = item.weightKg;
            totalWeight += Number(itemWeight);
          });
        }
        this.itemsWeight = totalWeight;
        return;
      },
      error: (err) => {
        return ;
      }

    });
    return ;
  }


}
