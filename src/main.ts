import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AuthInterceptorsService } from './app/interceptors/auth.interceptors.service';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers || [], // Keep existing providers
    importProvidersFrom(HttpClientModule), // Ensure HttpClientModule is imported
    provideHttpClient(withInterceptors([AuthInterceptorsService])) // Register interceptor correctly
  ]
}).catch((err) => console.error(err));
