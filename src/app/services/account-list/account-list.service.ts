import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountListService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  retrieveAllAccounts(url)
  {
    return this.http.get<Account[]>(url);
  }

  // tslint:disable-next-line:typedef
  deleteProfile()
  {
    return this.http.delete(`http://localhost:8080/myaccount/profile/delete`);
  }

}
