import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersComponent } from './components/users/users.component';
import { authGuard } from './Gaurds/auth.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const routes: Routes = [
    {
        path:'', component: LoginComponent
    },
    {
        path:'signup', component: SignupComponent
    },
    {
        path:'dashboard', component: UsersComponent, canActivate:[authGuard]
    },
    {
        path: 'user/:id', component: SignupComponent, canActivate:[authGuard]
    },
    {
        path: 'reset', component: ResetPasswordComponent
    },
];
