import { Component, OnInit } from '@angular/core';
import {AccountListService} from '../services/account-list/account-list.service';
import {Router} from '@angular/router';

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
        this.message = 'Profile has been deleted';
        this.invalidRequest = false;
        this.logOutOnDeletion();
        // @ts-ignore
        // this.accounts = response;
        },
      error => {
        this.message = 'Profile cannot be deleted , accounts with balance present';
        this.invalidRequest = true;
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
