import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransactionsService} from '../services/transaction/transactions.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {RegistrationService} from '../services/registration/registration.service';
import {AccountListService} from '../services/account-list/account-list.service';
import {TransactionHistoryService} from '../services/transaction/transaction-history.service';

export class Account {
  constructor(
    public id: number,
    public accountNumber: string,
    public routingNumber: string,
    public accountType: string,
    public balance: number,
    public dateOfOpening: Date,
    public interestRate: number,
    public encryptedUrl: string)
  {
  }
}

export class Transactions{
  transactionAmount?: any;
  accounts?: TransAccount[] 
}

export class TransAccount{
 accountNumber?: string;
 routingNumber?: string;
}

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  transferForm: FormGroup;
  url: string;
  currentAccount: Account;
  accountsArray: Account[];

  submitTrans: Transactions = {};
  submitTransAccount: TransAccount = {};
  transAcctArray: TransAccount[] = [];

  constructor(private transactionService: TransactionsService,
              private router: Router,
              public dialogRef: MatDialogRef<TransferComponent>,
              private fb: FormBuilder,
              private registrationService: RegistrationService,
              private listService: AccountListService,
              private accountService: TransactionHistoryService) { }

  ngOnInit(): void {
    this.retrieveAccountUrl();
    this.getAccount(this.router.url);
    this.getAllAccounts();
    this.filterOutCurrentAccount();
    this.transferForm = this.fb.group({
      transactionAmount: [, [Validators.required,Validators.pattern('^\\d+\\.\\d\\d$')]], //must be a double XX.XX
      internalAccount: this.fb.array([
        this.internalAccountForm()
      ]),
    });
  }

  internalAccountForm(){
    return this.fb.group({
      accountNumber:[,Validators.required],
    })
  }

  get internalAccountArray(){
    return this.transferForm.get("internalAccount") as FormArray;
  }

  get transactionAmount(){
    return this.transferForm.get('transactionAmount');
  }

  get accountNumber(){
    return this.transferForm.get('accountNumber');
  }

  transfer(): void{
    this.setSubmitTransfer();
    console.log(JSON.stringify(this.submitTrans));
    console.log(this.url);
    this.registrationService.putToServer(this.url, JSON.stringify(this.submitTrans)).subscribe();
  }

  private retrieveAccountUrl(): void{
    this.url = this.router.url+"/transfer";
  }

  //sets the form data to the object before stringifying to the desired json format
  setSubmitTransfer(){
    //console.log(this.useExternalAcct); 
    this.submitTransAccount.accountNumber = this.internalAccountArray.at(0).get("accountNumber").value;
    this.transAcctArray.push(this.submitTransAccount);
    this.submitTrans.accounts = this.transAcctArray;
    this.submitTrans.transactionAmount = this.transferForm.get("transactionAmount").value;
  }

  filterOutCurrentAccount(){
      console.log(this.currentAccount.accountNumber);
      this.accountsArray = this.accountsArray.filter(a=>a.accountNumber===this.currentAccount.accountNumber)
      console.log("transferable accounts are:"+this.accountsArray)
  }

  getAllAccounts()
  {
    this.listService.retrieveAllAccounts().subscribe(
      response => {
        console.log(response);
        // @ts-ignore
        this.accountsArray = response
      }
    );
  }

  private getAccount(url: string): void {
    this.accountService.fetchAccount(url).subscribe(account => {
        this.currentAccount = account;
        console.log("current account is:" + account);
      }
    );
  }
}

