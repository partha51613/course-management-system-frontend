import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Access Router service
  const token = localStorage.getItem('token'); // Check if the token exists in localStorage
  console.log("Token in localstorage is: " +token)
  if (token) {
    // Token exists, allow access to the route
    return true;
  }

  // No token, redirect to login page
  router.navigate(['/login']);
  return false; // Deny access
};
