import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication/authenticationservice.service';
import {TransactionHistoryService} from '../transaction-history.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  accounts: Account[];

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private historyService: TransactionHistoryService) { }

  ngOnInit(): void {

  }

  fetchAccounts(): void{

  }




}
