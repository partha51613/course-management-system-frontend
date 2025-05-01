import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  logoutUser() {
    // Call the backend logout API
    this.http.post('/api/logout', {}).subscribe({
      next: () => {
        // Clear local and session storage & cookies
        this.authService.logout();

        // Redirect to login after successful logout
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
        
        // Fallback: Clean up client-side data and redirect
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
