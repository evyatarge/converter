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

  sourceCurrency: string = '';
  targetCurrency: string = '';

  sourceValue: number = 0;
  targetValue: number = 0;

  private serviceConversion = (source: number): number => 3.14;

  targetChanged(targetCurrency: string) {
    this.targetCurrency = targetCurrency;
    this.calculateTargetValue()
  }

  sourceChanged(sourceCurrency: string) {
    this.sourceCurrency = sourceCurrency;
    this.calculateTargetValue();
  }

  valueToConvertChanged(valueToConvert: number) {
    this.sourceValue = valueToConvert;
    this.calculateTargetValue();
  }


  private calculateTargetValue(): void {
    this.targetValue = this.serviceConversion(this.sourceValue) ?? 0;
  }
}
