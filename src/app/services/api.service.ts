import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {

  private baseUrl: string = 'https://api.frankfurter.dev/v1/';

  constructor(private http: HttpClient) {}

  private get$(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoint}`);
  }

  public getCurrencies(): Observable<Currencies> {
    return this.get$('currencies');
  }

  public getConversionRate(from: string, to: string): Observable<ConversionRate> {
    return this.get$(`latest?base=${from}&symbols=${to}`);
  }

  public convert(rates: Currencies, amount: number, to: string): string {
    return (amount * Number(rates[to])).toFixed(2);
  }
}

export interface Currencies {
  [currencyKey: string]: [currencyTitle: number];
}
export interface ConversionRate {
  amount: number;
  base: string;
  date: string;
  rates: Currencies,
}
