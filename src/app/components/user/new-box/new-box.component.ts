import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-new-box',
  standalone: true,
  imports: [InputTextModule, InputNumberModule, FormsModule, FloatLabelModule, ButtonModule, CommonModule, MessageModule],
  templateUrl: './new-box.component.html',
  styleUrl: './new-box.component.scss'
})
export class NewBoxComponent {

  boxName: string = '';
  boxSize = {
    width: 0,
    length: 0,
    height: 0
  };
  boxfullSize: number = 0;
  errorMessage: string = '';
  dialogVisible: boolean = false;

  createBox() {
    this.boxfullSize = this.boxSize.height * this.boxSize.length * this.boxSize.width;
    const newBox = {
      name: this.boxName,
      size: this.boxfullSize
    };

    try {
      if (!this.boxName || this.boxfullSize == 0) {
        throw new Error('Hiányzó doboz adatok');
      }
      if (this.boxfullSize > 1000000) {
        throw new Error('A doboz mérete túl nagy');
      }
      if (this.boxSize.height < 0 || this.boxSize.length < 0 || this.boxSize.width < 0) {
        throw new Error('Nem adhatsz meg negatív méretet');
      }
      //itt lesz a post
      console.log('Creating box:', newBox);
      this.errorMessage = '';
      this.dialogVisible = false;
    }
    catch (error) {
      console.error('Error creating box:', error);
      this.errorMessage = error instanceof Error ? error.message : 'Ismeretlen hiba történt a doboz létrehozása során';
      this.dialogVisible = true;
      setTimeout(() => {
        this.dialogVisible = false;
      }, 2000);
    }
  }
}
