import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AccountListService} from '../services/account-list.service';

export class Account {
  constructor(
    public id: number,
    public accountNumber: string,
    public routingNumber: string,
    public accountType: string,
    public balance: number,
    public interestRate: number,
    public dateOfOpening: Date
  )
  {
  }
}
@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css']
})
export class ListAccountsComponent implements OnInit {
 accounts: Account[];
 message: string;

  constructor(private router: Router , public listService: AccountListService) { }

  ngOnInit(): void {


  }

  // tslint:disable-next-line:typedef
  getAllAccounts()
  {
    this.listService.retrieveAllAccounts().subscribe(
      response => {
        console.log(response);
        // @ts-ignore
        this.accounts = response;
      }
    );
  }

}
