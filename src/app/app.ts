import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDo } from './to-do/to-do';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToDo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('front_app');
}
