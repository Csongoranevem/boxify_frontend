import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';
import { Box } from '../../../interfaces/box';
@Component({
  selector: 'app-new-box',
  standalone: true,
  imports: [InputTextModule, InputNumberModule, FormsModule, FloatLabelModule, ButtonModule, CommonModule, MessageModule],
  templateUrl: './new-box.component.html',
  styleUrl: './new-box.component.scss'
})
export class NewBoxComponent {

  constructor(
    private api: ApiService,
    private messageService: MessageService
  ) { }

  newBox: Box = {
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


  createBox() {

    let fullSize = this.newBox.lengthCm * this.newBox.widthCm * this.newBox.heightCm;

    try {
      if (!this.newBox.code || fullSize == 0) {
        throw new Error('Kérem, adjon meg minden szükséges adatot');
      }
      if (fullSize > 10000000) {
        throw new Error('A doboz mérete túl nagy');
      }
      if (this.newBox.heightCm < 0 || this.newBox.lengthCm < 0 || this.newBox.widthCm < 0) {
        throw new Error('Nem adhatsz meg negatív méretet');
      }
      //itt lesz a post
      console.log('Creating box:', this.newBox);
    }
    catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Hiba', detail: error.message });
    }
  }
}
