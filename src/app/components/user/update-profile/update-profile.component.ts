
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule,InputGroupAddonModule,InputGroup,MenuModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {


  isInputDisabled:boolean=true;
  icon="pi pi-pencil";
  toggleInput()
  {
      this.isInputDisabled=!this.isInputDisabled;
      if(this.isInputDisabled){
        this.icon="pi pi-times"
      }
      else{
        this.icon="pi pi-pencil";
      }
  }
}
