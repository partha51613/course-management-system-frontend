import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { Dashboard1Component } from './components/dashboard1/dashboard1.component';
import { TaRegisterComponent } from './components/ta-register/ta-register.component';
import { SmeRegisterComponent } from './components/sme-register/sme-register.component';
import { CoursesComponent } from './components/courses/courses.component';
import { UsersComponent } from './components/users/users.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  // Public
  { path: 'login', component: LoginComponent },
  { path: 'ta-registration', component: TaRegisterComponent },
  { path: 'sme-registration', component: SmeRegisterComponent },

  // Protected layout + children
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],           // block loading the layout if no token
    canActivateChild: [authGuard],      // block all child routes if no token
    children: [
      // default child → /dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { 
        path: 'dashboard',
        component: Dashboard1Component,
        title: 'Dashboard',
      },
      {
        path: 'users',
        component: UsersComponent,
        title: 'Users',
      },
      {
        path: 'courses',
        component: CoursesComponent,
        title: 'Courses',
      },
    ],
  },

  // Catch-all → send to login (not into a guarded route)
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
