import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router)

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  formValue: any;

  onLogin() {
    // this.formValue = this.loginForm.value;
    // console.log(this.formValue)
    // console.log(this.formValue)
    console.log(this.loginForm.value)

  }

}
