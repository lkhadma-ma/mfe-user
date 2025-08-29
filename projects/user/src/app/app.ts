import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsershellComponent } from "./domains/user/feature/user-shell.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UsershellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('user');
}
