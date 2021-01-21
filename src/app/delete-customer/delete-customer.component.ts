import { Component, OnInit } from '@angular/core';
import {AccountListService} from '../services/account-list/account-list.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication/authenticationservice.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {
  message: string;
  invalidRequest = false;
  constructor(private router: Router , public listService: AccountListService) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  deleteProfile()
  {
    this.listService.deleteProfile().subscribe(
      response => {
        this.navigateToList();
       },
      error => {
       console.log('Error status' + error);
       if (error === '200')
       {
         this.logOutOnDeletion();
       }
       else
         {
           this.navigateToList();
         }
      }
    );
  }
  // tslint:disable-next-line:typedef
  navigateToList()
  {
    this.router.navigate(['myaccount']);
  }
// tslint:disable-next-line:typedef
  logOutOnDeletion() {
    this.router.navigate(['logout']);
  }
  
}
