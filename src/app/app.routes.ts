import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { Dashboard1Component } from './components/dashboard1/dashboard1.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { TaRegisterComponent } from './components/ta-register/ta-register.component';
import { SmeRegisterComponent } from './components/sme-register/sme-register.component';
import { CoursesComponent } from './components/courses/courses.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'ta-registration',
    component: TaRegisterComponent,
  },
  {
    path: 'sme-registration',
    component: SmeRegisterComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard1',
        component: Dashboard1Component,
        title: 'Dashboard 1',
      },
      {
        path: 'courses',
        component: CoursesComponent,
        title: 'Courses',
      },
    ],
  },
  {
    path: '**', // Catch-all for undefined routes (optional)
    redirectTo: 'login',
  },
];
