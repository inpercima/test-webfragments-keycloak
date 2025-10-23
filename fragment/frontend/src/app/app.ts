import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fragment frontend');
  readonly http = inject(HttpClient);

  message = signal('');

  sayHello() {
    this.http.get('http://localhost:8000/api/hello').subscribe((response: any) => {
      this.message.set(response.message);
    });
  }
}
