import { Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { ChatComponent } from '../app/chat/chat.component';
import { RegistrationComponent } from '../app/registration/registration.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'registration', component: RegistrationComponent}
];
