import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ConvertInputComponent} from './convert-input/convert-input.component';
import {ConverterDropdownComponent} from './converter-dropdown/converter-dropdown.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConvertInputComponent, ConverterDropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Currency Converter';
  currenciesOptions = ["USD", "EUR", "GBP", "ILS"];
  convertSource: string = '0';
  convertTarget: string = '0';
}
