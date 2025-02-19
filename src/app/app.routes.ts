import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { Dashboard1Component } from './components/dashboard1/dashboard1.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard1',
                component: Dashboard1Component,
                title: 'Dashboard 1'
            }
        ]
    }
];
