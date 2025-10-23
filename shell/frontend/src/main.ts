import { bootstrapApplication } from '@angular/platform-browser';
import { initializeWebFragments } from 'web-fragments';
import { App } from './app/app';
import { appConfig } from './app/app.config';

initializeWebFragments();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
