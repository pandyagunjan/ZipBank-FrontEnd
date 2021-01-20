import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgModel, Validators} from '@angular/forms';
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
  rawAccountsArray: Account[];
  selectedAccount: number = 0;

  submitTrans: Transactions = {};
  submitTransAccount: TransAccount = {};
  transAcctArray: TransAccount[] = [];
  urlMyAccount = 'http://localhost:8080/myaccount';
  constructor(private transactionService: TransactionsService,
              private router: Router,
              public dialogRef: MatDialogRef<TransferComponent>,
              private fb: FormBuilder,
              private registrationService: RegistrationService,
              private listService: AccountListService,
              private accountService: TransactionHistoryService) { }

  ngOnInit(): void {
    this.retrieveAccountUrl();
    this.getAllAccounts();
    this.transferForm = this.fb.group({
      transactionAmount: [, [Validators.required,Validators.pattern('^\\d+\\.\\d\\d$')]], //must be a double XX.XX
      internalAccount: this.fb.array([
        this.internalAccountForm()
      ]),
    });
  }

  internalAccountForm(){
    return this.fb.group({
      accountNumber:[,Validators.required]
    })
  }

  get internalAccountArray(){
    return this.transferForm.get("internalAccount") as FormArray;
  }

  get transactionAmount(){
    return this.transferForm.get("transactionAmount");
  }

  get accountNumber(){
    return this.internalAccountArray.at(0).get("accountNumber");
  }

  private retrieveAccountUrl(): void{
    this.url = this.router.url+"/transfer";
  }

  transfer(): void{
    this.setSubmitTransfer();
    console.log(JSON.stringify(this.submitTrans));
    console.log(this.url);
    this.registrationService.putToServer(this.url, JSON.stringify(this.submitTrans)).subscribe(
    );
    location.reload();
  }

  //sets the form data to the object before stringifying to the desired json format
  setSubmitTransfer(){
    //console.log(this.useExternalAcct);
    this.submitTransAccount.accountNumber = this.internalAccountArray.at(0).get("accountNumber").value;
    this.transAcctArray.push(this.submitTransAccount);
    this.submitTrans.accounts = this.transAcctArray;
    this.submitTrans.transactionAmount = this.transferForm.get("transactionAmount").value;
  }

  getAllAccounts()
  {
    this.listService.retrieveAllAccounts(this.urlMyAccount).subscribe(
        response=>{
          //console.log(response);
          this.rawAccountsArray = response as unknown as Account[]; //not sure why this is required to assign the response to accountsArray
          this.getAccount(this.router.url);
        }
    );
  }

  //get the current account user is in
  private getAccount(url: string): void {
    this.accountService.fetchAccount(url).subscribe(account => {
        this.currentAccount = account;
        this.filterOutCurrentAccount();
        //console.log("hello"+JSON.stringify(account));
      }
    );
  }

  //remove the account the user is currently in from the selection of accounts to transfer to
  filterOutCurrentAccount(){
    this.accountsArray = this.rawAccountsArray.filter(a=>a.accountNumber!=this.currentAccount.accountNumber);
    //console.log("transferable accounts are:"+ JSON.stringify(this.accountsArray));
}
}

