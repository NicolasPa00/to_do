import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { ToDo } from './app/to-do/to-do';            // ← cambia a tu componente
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(ToDo, config, context);     // ← usa ToDo

export default bootstrap;
