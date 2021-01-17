import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TransactionsService} from '../services/transaction/transactions.service';
import {MatDialogRef} from '@angular/material/dialog';
import {TransactionHistoryService} from '../services/transaction/transaction-history.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  withdrawForm: FormGroup;
  url: string;

  constructor(private transactionService: TransactionsService,
              private historyService: TransactionHistoryService,
              private router: Router,
              public dialogRef: MatDialogRef<WithdrawComponent>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.retrieveAccountUrl();
    this.withdrawForm = this.fb.group({
      amount: [, [Validators.required, Validators.pattern('^[0-9]$')]],
      accounts: this.fb.array([this.getAccountNumbers()])
    });
  }

  // tslint:disable-next-line:typedef
  get amount(){
    return this.transaction.get('amount');
  }

  // tslint:disable-next-line:typedef
  get accounts(){
    return this.transaction.controls.accounts as FormArray;
  }

  // tslint:disable-next-line:typedef
  get accountNumber(){
    return this.transaction.get('accountNumber');
  }

  // tslint:disable-next-line:typedef
  get routingNumber(){
    return this.transaction.get('routingNumber');
  }

  withdraw(): void{
    this.transactionService.withdraw(this.withdraw, this.url);
  }

  private retrieveAccountUrl(): void{
    this.url = this.router.url;
  }

  // tslint:disable-next-line:typedef
  private getAccountNumbers() {
    return this.fb.group({
      accountNumber: [, [Validators.required, Validators.pattern('^[0-9]$')]],
      routingNumber: [, [Validators.required, Validators.pattern('^[0-9]$')]]
    });
  }
}
