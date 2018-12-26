import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';

import {Portfolio} from '../../shared/models/portfolio';
import {LoadListPayload, LoadListSuccessPayload} from '../../shared/models/list';

@Injectable({
  providedIn: 'root'
})
export class PortfoliosService {
  constructor(protected http: HttpClient) {
  }

  loadPortfolios({sortInfo, filters}: LoadListPayload): Observable<LoadListSuccessPayload<Portfolio>> {
    return this.http.get<Portfolio[]>('api/portfolios', {
      observe: 'response',
      params: {
        _sort: sortInfo.prop
      }
    })
      .pipe(
        map((response) => ({
          count: 0,
          data: response.body
        }))
      );
  }

  removePortfolio(portfolio: Portfolio): Observable<Portfolio> {
    return this.http.delete<void>(`api/portfolios/${portfolio.id}`).pipe(
      map((response) => portfolio)
    );
  }

  updatePortfolio(portfolio: Portfolio): Observable<Portfolio> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const httpPayload = {
      'quantity': portfolio.quantity
    };
    return this.http.patch<any>(`api/portfolios/${portfolio.id}`, httpPayload,  httpOptions)
      .pipe(
        map((response) => portfolio)
      );
  }
}
