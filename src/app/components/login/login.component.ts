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
  // Variables
  loginStep = 1; //Track the login step , the frontend loads the UI based on this value
  responseData: any;
  globalEmail: string = "";
  
  // Flags
  isOTPsent = false;
  isOTPVerified = false;

  // Store login form data
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    otpValue: new FormControl()
  });

  //Injection
  private apiservice = inject(ApiService);
  private router = inject(Router) // Remove private if it causes problem

  // If loginStep === 1 i.e Default State 
  sendOTP() {
    console.log("SendOTP Clicked")
    const ENDPOINT = '/auth/request-otp';
    const email = this.loginForm.get('email')?.value; // Correctly get email value
    const body = {
      "email": `${email}`
    };
    console.log("Body is " + JSON.stringify(body))
    this.apiservice.postData(ENDPOINT, body).subscribe({
      next: (response) => {
        // success Toast here
        console.log("resp here: " + JSON.stringify(response))
        this.globalEmail = email;
        this.loginStep = 2;
      },
      error: (error) => {
        // failure Toast here
        this.loginForm.get('email')?.reset();
        console.log("Email value: " + this.loginForm.get('email')?.value)
      },
      complete: () => {
        console.log('Request completed');
      }
    });

  }

  // If loginStep === 2 
  verifyOTP() {
    console.log("verifyOTP Clicked")
    const ENDPOINT = '/auth/verify-otp';
    const otpEntered = this.loginForm.get('otpValue')?.value; // Get otp value from frontend
    console.log(otpEntered);
    console.log("Email from prev func " + this.globalEmail)
    const body = {
      "email": `${this.globalEmail}`,
      "otp": otpEntered
    };
    console.log("Body is " + JSON.stringify(body))
    this.apiservice.postData(ENDPOINT, body).subscribe({
      next: (response) => {
        console.log('Success:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

}
