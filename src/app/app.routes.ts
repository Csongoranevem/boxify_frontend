import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { NewBoxComponent } from './components/user/new-box/new-box.component';
import { MyBoxesComponent } from './components/user/my-boxes/my-boxes.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { UpdateProfileComponent } from './components/user/update-profile/update-profile.component';
import { NewItemComponent } from './components/user/new-item/new-item.component';
import { MyItemsComponent } from './components/user/my-items/my-items.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },

    { path: 'myboxes', component: MyBoxesComponent },
    { path: 'create_new_box', component: NewBoxComponent },
    { path: 'create_new_item', component: NewItemComponent },
    { path: 'logout', component: LogoutComponent},
    {path:'updateprofile',component:UpdateProfileComponent},
    { path: 'myitems', component: MyItemsComponent },

    { path: '**', redirectTo: '/login' }
];
