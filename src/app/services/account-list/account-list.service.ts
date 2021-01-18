import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountListService {
    constructor(private http: HttpClient, private router: Router ) { }

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
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `${error.status}`
      );
      if (`${error.status}` === '200'){
        this.router.navigate(['logout']);
        alert('Customer and accounts are deleted');
      }
      else if (`${error.status}` === '403'){
        alert('Account with balance present');
        this.router.navigate(['myaccount']);
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
