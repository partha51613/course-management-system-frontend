import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router'

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router)

  onLogin() {
    this.router.navigateByUrl('dashboard2')
  }
}
