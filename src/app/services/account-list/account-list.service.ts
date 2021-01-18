import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

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
    return this.http.delete(`http://localhost:8080/myaccount/profile/delete`).pipe(catchError(this.handleError));
  }
  // tslint:disable-next-line:typedef
  handleError(error: HttpErrorResponse) {
    let errorStatus = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `${error.status}`
      );
      if (`${error.status}` === '200'){
        alert('Customer and accounts are deleted');
        errorStatus = `${error.status}`;
       }
      else if (`${error.status}` === '403'){
        alert('Profile cannot be deleted , accounts with balance present');
       }
    }
    return throwError(errorStatus);
  }
}
