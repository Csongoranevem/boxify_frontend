import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MessageService } from 'primeng/api';
import { User } from '../../../interfaces/user';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';


@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [FormsModule, DialogModule,InputText,TextareaModule,ButtonModule,TableModule],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.scss'
})
export class UserslistComponent {
constructor(
    private api: ApiService,
    private messageService: MessageService
  ) { }

  users: User[] = [];
  visible: boolean = false;


  selectedUser: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: '',
    secret: '',
    status: false
  };
  
  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.api.selectAll('users').subscribe({
      next: (data) => {
        this.users = data as User[];
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: err.message, life: 3000 });
      }
    });
  }

  banUser(id:any){

    this.selectUser(id);
   
          this.api.update('users',id,{status:!this.selectedUser.status}).subscribe({
      next:(data)=>{
        this.loadUsers();
      },
        error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: err.message, life: 3000 });
      }
    })
    
    

  }


  selectUser(id:any)
  {
    this.api.selectById("users",id).subscribe({
      next:(data)=>{
        this.selectedUser=data as User;
        this.loadUsers();
      }
    })
  }
}
