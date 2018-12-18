import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  constructor(protected http: HttpClient) { }

  loadUserBalance() {
    return this.http.get<any>('api/userBalance', {
      observe: 'response'
    })
      .pipe(
        map((response) => {
          console.log(response.body);
          return response.body.balance;
        })
      );
  }

  updateBalance(payload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const httpPayload = {
      'balance': payload
    }

    return this.http.put<any>('api/userBalance', httpPayload, httpOptions)
      .pipe(
        map((response) => {
          console.log(response);
          return response.balance;
        })
      );
  }
}
