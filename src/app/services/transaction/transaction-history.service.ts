import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../../app.apiurl';
import {AccountHist} from '../../transaction-history/accountHist';
import {Params} from '@angular/router';

const httpOption = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    Authorization: ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService {

  constructor(private http: HttpClient) { }


  fetchAccountHistory(url: Params): Observable<any> {
    return this.http.get(`${API_URL}/myaccount/${url}`, httpOption);
  }
}



