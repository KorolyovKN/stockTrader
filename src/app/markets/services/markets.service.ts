import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';

import { Market } from '../models/market';
import {map, tap} from 'rxjs/internal/operators';
import {Filters, LoadListPayload, LoadListSuccessPayload, SerializedFilters} from '../../shared/models/list';
import {Portfolio} from '../../shared/models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {
  constructor(protected http: HttpClient) {
  }

  private serializeFilter(filters: Filters): SerializedFilters {
    if (filters === null) {
      return {};
    }

    const filterObj = {};

    filters.forEach((v, k) => {
      if (!['null', ''].includes(String(v))) {
        filterObj[String(k)] = v;
      }
    });

    return filterObj;
  }

  loadMarkets({sortInfo, filters}: LoadListPayload): Observable<LoadListSuccessPayload<Market>> {
    return this.http.get<Market[]>('api/stocks', {
      observe: 'response',
      params: {
        _sort: sortInfo.prop,
        ...this.serializeFilter(filters)
      }
    })
      .pipe(
        map((response) => ({
          count: Number(response.headers.get('X-Total-Count')),
          data: response.body
        }))
      );
  }

  loadCategories() {
    return this.http.get<Array<string>>('api/stocksCategories', {
      observe: 'response', params: {}
    })
    .pipe(
      map((response) => ({
        data: response.body
      }))
    );
  }

  purchaseMarket(payload: Portfolio): Observable<Portfolio> {
    return this.http.post<Portfolio>('/api/portfolios', payload);
  }
}
