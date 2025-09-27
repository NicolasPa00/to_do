import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ToDo } from './app/to-do/to-do';


bootstrapApplication(ToDo, appConfig)
  .catch(err => console.error(err));
