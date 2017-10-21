import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template: `
    <markdown [path]="'home.md' | translate"></markdown>
  `,
})
export class HomeComponent { }
