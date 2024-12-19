import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    ...(appConfig.providers || []) // Spread operator y manejo del caso de que no existan providers
  ],
}).catch((err) => console.error(err));