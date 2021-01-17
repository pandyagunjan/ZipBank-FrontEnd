import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../../app.apiurl';
import {AccountHist} from '../../transaction-history/accountHist';
import {Params} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService {

  constructor(private http: HttpClient) { }

  fetchAccount(url: string): Observable<any> {
    return this.http.get(`${API_URL}${url}`);
  }
}



