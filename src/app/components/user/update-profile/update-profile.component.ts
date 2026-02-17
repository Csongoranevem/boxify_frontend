
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule,InputGroupAddonModule,InputGroup,MenuModule, PasswordModule, FloatLabelModule, DatePipe],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit {

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  isEmailInputDisabled:boolean=true;
  isNameInputDisabled:boolean=true;
  userDetails: object = {
    name: '',
    email: '',
    lastLogin: '',
    registrationDate: ''
  };

  async ngOnInit(): Promise<void> {
    await this.api.selectById("users", this.auth.GetLoggedUser().id).subscribe(profile => {
      console.log(profile)
      this.userDetails = profile;
    });
  }

  Emailicon="pi pi-pencil";
  Nameicon="pi pi-pencil";
  toggleEmailInput()
  {
    this.Emailicon = this.isEmailInputDisabled ? "pi pi-times" : "pi pi-pencil";
    this.isEmailInputDisabled = !this.isEmailInputDisabled;
  }

  toggleNameInput()
  {
    this.Nameicon = this.isNameInputDisabled ? "pi pi-times" : "pi pi-pencil";
    this.isNameInputDisabled = !this.isNameInputDisabled;
  }


  saveChanges()
  {
    this.api.update("users", this.auth.GetLoggedUser().id, {
      //email: this.isEmailInputDisabled ? null : this.userDetails.email,
      //name: this.isNameInputDisabled ? null : this.userDetails.name
    });
  }


  isPasswordValid(): boolean {
    const oldPassword = (document.getElementById("OldpasswordField") as HTMLInputElement).value;
    const newPassword = (document.getElementById("NewpasswordField") as HTMLInputElement).value;
    const confirmNewPassword = (document.getElementById("ConfirmNewpasswordField") as HTMLInputElement).value;

    return oldPassword !== "" && newPassword !== "" && newPassword === confirmNewPassword;
  }
}
