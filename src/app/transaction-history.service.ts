import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Transaction} from './transactions/transaction';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from './app.apiurl';

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



}



