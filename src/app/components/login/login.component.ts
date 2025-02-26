import { Component, Inject, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';
// import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Variables
  loginStep = 1; //Track the login step , the frontend loads the UI based on this value
  responseData: any;
  globalEmail: string = '';

  // Flags
  isOTPsent = false;
  isOTPVerified = false;

  // Store login form data
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    otpValue: new FormControl(),
  });

  //Injection
  private apiservice = inject(ApiService);
  private router = inject(Router); // Remove private if it causes problem
  // private toastr = inject(ToastrService)

  constructor(private toastr: ToastrService) {}

  // If loginStep === 1 i.e Default State
  sendOTP() {
    console.log('SendOTP Clicked');
  
    const ENDPOINT = '/auth/request-otp';
    this.globalEmail = this.loginForm.get('email')?.value?.trim(); // Trim whitespace for safety
  
    if (!this.globalEmail) {
      this.toastr.error('Please enter a valid email address.');
      return;
    }
  
    const body = { email: this.globalEmail };
    console.log('Request Body:', body);
  
    this.apiservice.postData(ENDPOINT, body).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.loginStep = 2;
        this.toastr.success(`OTP sent successfully to ${this.globalEmail}`);
      },
      error: () => {
        this.loginForm.get('email')?.reset();
        this.toastr.error(`Email ID ${this.globalEmail} not found. Please enter a correct email ID.`);
      },
      complete: () => console.log('Request completed'),
    });
  }
  

  // If loginStep === 2
  verifyOTP() {
    console.log('verifyOTP Clicked');
    const ENDPOINT = '/auth/verify-otp';
    const otpEntered = this.loginForm.get('otpValue')?.value; // Get otp value from frontend
    console.log(otpEntered);
    console.log('Email from prev func ' + this.globalEmail);
    const body = {
      email: `${this.globalEmail}`,
      otp: otpEntered,
    };
    console.log('Body is ' + JSON.stringify(body));
    this.apiservice.postData(ENDPOINT, body).subscribe({
      next: (response) => {
        console.log('Success:', response);
        window.localStorage.setItem('token', response.token);
        this.toastr.success(`Logged in successfully`);

      },
      error: (error) => {
        console.error('Error:', error);
        this.toastr.error(`Wrong OTP. Please enter correct OTP.`);

      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }
}
