import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication/authenticationservice.service';
import {TransactionHistoryService} from '../transaction-history.service';
import {AccountListService} from '../services/account-list.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  account: Account;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private historyService: TransactionHistoryService,
              private accountListServ: AccountListService) { }

  ngOnInit(): void {

  }

  fetchAccount(id: number): void{
    let acc: Observable<Account[]>;
    acc = this.accountListServ.retrieveAllAccounts(id);

    acc.forEach(a => {
      if(a.id){

      }
    });
  }




}
