import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { NewBoxComponent } from './components/user/new-box/new-box.component';
import { MyBoxesComponent } from './components/user/my-boxes/my-boxes.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },

    { path: 'myboxes', component: MyBoxesComponent },
    { path: 'create_new_box', component: NewBoxComponent },


    { path: '**', redirectTo: '/login' }
];
