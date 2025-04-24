import {Component, OnInit, inject, OnDestroy} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ConvertInputComponent} from './components/convert-input/convert-input.component';
import {ConverterDropdownComponent} from './components/converter-dropdown/converter-dropdown.component';
import {ApiService, Currencies} from './services/api.service';
import {map, Observable, of, Subscription} from 'rxjs';
import {AsyncPipe, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ApiService],
  imports: [RouterOutlet, ConvertInputComponent, ConverterDropdownComponent, AsyncPipe, NgIf, NgSwitch, NgSwitchCase],
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

  private apiService: ApiService = inject(ApiService);
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.currenciesOptions = this.apiService.getCurrencies().pipe(map((c: Currencies)=> Object.keys(c)));
    this.setInitialCurrency();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private setInitialCurrency() {
    this.subscriptions.add(this.currenciesOptions.subscribe(currencies => {
      this.sourceCurrency = currencies[0];
      this.targetCurrency = currencies[0];
    }))
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
    this.serviceConversion(this.sourceValue);
  }

  private serviceConversion(source: number): void {
    if (this.sourceCurrency && this.targetCurrency) {
      this.subscriptions.add(
      this.apiService.getConversionRate(this.sourceCurrency, this.targetCurrency)
        .subscribe((conversion) => {
          console.log(conversion);
          const converted = this.apiService.convert(conversion.rates, source, this.targetCurrency);
          this.targetValue = Number(converted);
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
