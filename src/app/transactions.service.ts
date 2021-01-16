import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from './transactions/transaction';
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
export class TransactionsService {

  constructor(private http: HttpClient) { }

  withdraw(transaction: Transaction): void{
    this.http.put<any>(`${API_URL}/myaccount/withdraw`, transaction, httpOption);
  }

  deposit(transaction: Transaction): void{
    this.http.put<any>(`${API_URL}/myaccount/deposit`, transaction, httpOption);
  }

  transfer(transaction: Transaction): void{
    this.http.put<any>(`${API_URL}/myaccount/transfer`, transaction, httpOption);
  }
}
