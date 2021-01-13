import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountListService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  retrieveAllAccounts(id)
  {
    return this.http.get<Account[]>(`http://localhost:8080/myaccount/getAll/${id}`);
  }
}
