import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  public title = 'app';
}
