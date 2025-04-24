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
}

export interface Currencies {
  [currencyKey: string]: [currencyTitle: string];
}
