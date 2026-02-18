
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
import { User } from '../../../interfaces/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, InputGroupAddonModule, InputGroup, MenuModule, PasswordModule, FloatLabelModule, DatePipe],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit {

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private messageService: MessageService
  ) { }

  isEmailInputDisabled: boolean = true;
  isNameInputDisabled: boolean = true;
  userDetails: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: '',
    secret: '',
    status: true,
    reg: new Date(),
    last: new Date(),
  };

  async ngOnInit(): Promise<void> {
    await this.api.selectById("users", this.auth.GetLoggedUser().id).subscribe(profile => {
      this.userDetails = profile as User;
    });
  }

  Emailicon = "pi pi-pencil";
  Nameicon = "pi pi-pencil";
  toggleEmailInput() {
    this.Emailicon = this.isEmailInputDisabled ? "pi pi-times" : "pi pi-pencil";
    this.isEmailInputDisabled = !this.isEmailInputDisabled;
  }

  toggleNameInput() {
    this.Nameicon = this.isNameInputDisabled ? "pi pi-times" : "pi pi-pencil";
    this.isNameInputDisabled = !this.isNameInputDisabled;
  }


  saveChanges() {
    this.api.update("users", this.auth.GetLoggedUser().id, {
      email: this.userDetails.email,
      name: this.userDetails.name
    }).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully!', life: 3000 });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating profile!', life: 3000 });
      }
    });

  
  }


  isPasswordValid(): boolean {
    const oldPassword = (document.getElementById("OldpasswordField") as HTMLInputElement).value;
    const newPassword = (document.getElementById("NewpasswordField") as HTMLInputElement).value;
    const confirmNewPassword = (document.getElementById("ConfirmNewpasswordField") as HTMLInputElement).value;

    return oldPassword !== "" && newPassword !== "" && newPassword === confirmNewPassword;
  }


  updatePassword() {
    if (this.isPasswordValid()) {
      const oldPassword = (document.getElementById("OldpasswordField") as HTMLInputElement).value;
      const newPassword = (document.getElementById("NewpasswordField") as HTMLInputElement).value;

      this.api.update("users/updatepass", this.auth.GetLoggedUser().id, {
        oldPassword: oldPassword,
        newPassword: newPassword
      }).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password updated successfully!', life: 3000 });
          (document.getElementById("OldpasswordField") as HTMLInputElement).value = "";
          (document.getElementById("NewpasswordField") as HTMLInputElement).value = "";
          (document.getElementById("ConfirmNewpasswordField") as HTMLInputElement).value = "";
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating password!', life: 3000 });
        }
      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Hiba', detail: 'Töltsd ki az összes jelszó mezőt!', life: 3000 });

    }
  }
}
