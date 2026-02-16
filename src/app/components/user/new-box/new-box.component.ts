import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';
import { Box } from '../../../interfaces/box';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-new-box',
  standalone: true,
  imports: [InputTextModule, InputNumberModule, FormsModule, FloatLabelModule, ButtonModule, CommonModule, MessageModule, TextareaModule],
  templateUrl: './new-box.component.html',
  styleUrl: './new-box.component.scss'

})
export class NewBoxComponent {

  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private router: Router,
    private auth: AuthService
  ) { }

  userId: string = '';

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

      this.api.insert('boxes', this.newBox).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Siker', detail: 'A doboz sikeresen létrejött' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Hiba', detail: error.message });
        }
      });

      this.newBox = {
        id: '',
        userId: '',
        code: '',
        labelType: 'QR',
        lengthCm: 0,
        widthCm: 0,
        heightCm: 0,
        maxWeightKg: 0,
        location: 'Ismeretlen',
        note: '',
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Hiba', detail: error.message });
    }
  }
}
