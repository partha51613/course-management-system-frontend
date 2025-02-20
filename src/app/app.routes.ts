import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { Dashboard1Component } from './components/dashboard1/dashboard1.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
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
        path: 'dashboard2',
        component: Dashboard2Component,
        title: 'Dashboard 2',
      },
    ],
  },
  {
    path: '**', // Catch-all for undefined routes (optional)
    redirectTo: 'login',
  },
];
