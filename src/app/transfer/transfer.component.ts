import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransactionsService} from '../services/transaction/transactions.service';
import {TransactionHistoryService} from '../services/transaction/transaction-history.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  transferForm: FormGroup;
  url: string;

  constructor(private transactionService: TransactionsService,
              private historyService: TransactionHistoryService,
              private router: Router,
              public dialogRef: MatDialogRef<TransferComponent>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.retrieveAccountUrl();
    this.transferForm = this.fb.group({
      amount: [, [Validators.required, Validators.pattern('^[0-9]$')]],
      accounts: this.fb.array([this.getAccountNumbers()])
    });
  }

  // tslint:disable-next-line:typedef
  get amount(){
    return this.transferForm.get('amount');
  }

  // tslint:disable-next-line:typedef
  get accounts(){
    return this.transferForm.controls.accounts as FormArray;
  }

  // tslint:disable-next-line:typedef
  get accountNumber(){
    return this.transferForm.get('accountNumber');
  }

  // tslint:disable-next-line:typedef
  get routingNumber(){
    return this.transferForm.get('routingNumber');
  }

  transfer(): void{
    this.transactionService.transfer(this.transferForm, this.url);
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
