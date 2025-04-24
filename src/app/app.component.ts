import {Component, OnInit, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ConvertInputComponent} from './components/convert-input/convert-input.component';
import {ConverterDropdownComponent} from './components/converter-dropdown/converter-dropdown.component';
import {ApiService, Currencies} from './services/api.service';
import {map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConvertInputComponent, ConverterDropdownComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ApiService],
})
export class AppComponent implements OnInit {

  title = 'Currency Converter';
  currenciesOptions: Observable<string[]> = new Observable<string[]>();

  sourceCurrency: string = '';
  targetCurrency: string = '';

  sourceValue: number = 0;
  targetValue: number = 0;

  private apiService: ApiService = inject(ApiService);

  ngOnInit(): void {
    this.currenciesOptions = this.apiService.getCurrencies().pipe(map((c: Currencies)=> Object.keys(c) ));
  }

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

  // private
  private calculateTargetValue(): void {
    this.targetValue = this.serviceConversion(this.sourceValue) ?? 0;
  }

  private serviceConversion = (source: number): number => source*3.14;
}
