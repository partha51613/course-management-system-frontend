import { Component, Inject, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Track login step
  loginStep = 1;

  // Flags
  isOTPsent = false;
  isOTPVerified = false;

  router = inject(Router)

  // Store login form data
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    otpValue: new FormControl()
  });

  //Variables
  responseData: any;
  // otpValue?: string;

  private apiservice = inject(ApiService);

  sendOTP() {
    console.log("SendOTP Clicked")
    this.loginStep = 2;
    const ENDPOINT = '/auth/request-otp';
    const email = this.loginForm.get('email')?.value; // Correctly get email value
    const body = {
      "email": `${email}`
    };
    console.log("Body is " + JSON.stringify(body))
    this.apiservice.postData(ENDPOINT, body).subscribe({
      next: (response) => {
        console.log('Response:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });

  }

  verifyOTP() {
    this.loginStep = 3;
    console.log("verifyOTP Clicked")
    const otpEntered = this.loginForm.get('otpValue')?.value;
    console.log(otpEntered)
  }

}
