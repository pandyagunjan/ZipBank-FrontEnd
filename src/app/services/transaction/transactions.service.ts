import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../../app.apiurl';
import {FormGroup} from '@angular/forms';
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
export class TransactionsService {

  constructor(private http: HttpClient) { }

  withdraw(transaction: FormGroup, url: string): void{
    this.http.put<any>(`${API_URL}${url}/withdraw`, transaction, httpOption);
  }

  deposit(transaction: FormGroup, url: string): void{
    this.http.put<any>(`${API_URL}${url}/deposit`, transaction.value, httpOption);
    console.log(transaction);
  }

  transfer(transaction: FormGroup, url: string): void{
    this.http.put<any>(`${API_URL}${url}/transfer`, transaction, httpOption);
  }
}
