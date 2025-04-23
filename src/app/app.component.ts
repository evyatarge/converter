import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ConvertInputComponent} from './convert-input/convert-input.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConvertInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'converter';
}
