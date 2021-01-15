import { Component, OnInit } from '@angular/core';
import {AccountListService} from '../services/account-list/account-list.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  constructor(private router: Router ,public listService: AccountListService) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  deleteProfile()
  {
    this.listService.deleteProfile().subscribe(
      response => {
        console.log(response);
        // @ts-ignore
        this.accounts = response; },
      error => console.log('could not get because', error)
    );
  }
  // tslint:disable-next-line:typedef
  navigateToList()
  {
    this.router.navigate(['myaccount']);
  }
}
