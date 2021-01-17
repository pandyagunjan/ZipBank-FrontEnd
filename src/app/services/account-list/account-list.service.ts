import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountListService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  retrieveAllAccounts()
  {
    return this.http.get<Account[]>(`http://localhost:8080/myaccount`);
  }

  // tslint:disable-next-line:typedef
  deleteProfile()
  {
    return this.http.delete(`http://localhost:8080/myaccount/profile/delete`);
  }
}
