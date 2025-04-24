import {Component, OnInit, inject, OnDestroy} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ConvertInputComponent} from './components/convert-input/convert-input.component';
import {ConverterDropdownComponent} from './components/converter-dropdown/converter-dropdown.component';
import {ApiService, Currencies} from './services/api.service';
import {map, Observable, of, Subscription} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ApiService],
  imports: [RouterOutlet, ConvertInputComponent, ConverterDropdownComponent, AsyncPipe, NgIf, NgSwitch, NgSwitchCase, NgForOf],
})
export class AppComponent implements OnInit, OnDestroy {

  ConverterTabsEnum = ConverterTabsEnum;
  selectedTab: ConverterTabsEnum = ConverterTabsEnum.CONVERTER;

  title = 'Currency Converter';
  currenciesOptions: Observable<string[]> = new Observable<string[]>();

  sourceCurrency: string = '';
  targetCurrency: string = '';

  sourceValue: number = 0;
  targetValue: number = 0;

  currencyHistory: string[] = [];

  private apiService: ApiService = inject(ApiService);
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.currenciesOptions = this.apiService.getCurrencies().pipe(map((c: Currencies)=> {
      const currencies = Object.keys(c);
      currencies.unshift('');
      return currencies;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  targetChanged(targetCurrency: string) {
    this.targetCurrency = targetCurrency ?? this.targetCurrency;
    this.calculateTargetValue()
  }

  sourceChanged(sourceCurrency: string) {
    this.sourceCurrency = sourceCurrency ?? this.sourceCurrency;
    this.calculateTargetValue();
  }

  valueToConvertChanged(valueToConvert: number) {
    this.sourceValue = valueToConvert;
    this.calculateTargetValue();
  }

  // private
  private calculateTargetValue(): void {
    if (this.sourceCurrency && this.targetCurrency) {
      this.subscriptions.add(
      this.apiService.getConversionRate(this.sourceCurrency, this.targetCurrency)
        .subscribe((conversion) => {
          const converted = this.apiService.convert(conversion.rates, this.sourceValue, this.targetCurrency);
          this.targetValue = Number(converted);
          // record the conversion to history
          const record = `${this.sourceCurrency} => ${this.targetCurrency}: ${converted}`;
          this.currencyHistory.push(record);
        })
      );
    } else {
      this.targetValue = 0;
    }
  }
}

export enum ConverterTabsEnum {
  CONVERTER,
  HISTORY,
}
