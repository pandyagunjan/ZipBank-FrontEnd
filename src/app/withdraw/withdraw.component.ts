import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransactionsService} from '../services/transaction/transactions.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {RegistrationService} from '../services/registration/registration.service';

export class Transactions{
  transactionAmount?: any;
  accounts?: TransAccount[] 
}

export class TransAccount{
 accountNumber?: string;
 routingNumber?: string;
}

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  withdrawForm: FormGroup;
  url: string;

  submitTrans: Transactions = {};
  submitTransAccount: TransAccount = {};
  transAcctArray: TransAccount[] = [];

  constructor(private transactionService: TransactionsService,
              private router: Router,
              public dialogRef: MatDialogRef<WithdrawComponent>,
              private fb: FormBuilder,
              private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.retrieveAccountUrl();

    this.withdrawForm = this.fb.group({
      transactionAmount: [, [Validators.required,Validators.pattern('^\\d+\\.\\d\\d$')]], //must be a double XX.XX
      accountNumber:[,[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      routingNumber:[,[Validators.required, Validators.pattern('091000022')]]
    });
  }

  get transactionAmount(){
    return this.withdrawForm.get('transactionAmount');
  }

  get accountNumber(){
    return this.withdrawForm.get('accountNumber');
  }

  get routingNumber(){
    return this.withdrawForm.get('routingNumber');
  }

  withdraw(): void{
    this.setSubmitDeposit();
    console.log(this.withdrawForm.value);
    console.log(JSON.stringify(this.submitTrans));
    console.log(this.url);
    this.registrationService.putToServer(this.url, JSON.stringify(this.submitTrans)).subscribe();
  }

  private retrieveAccountUrl(): void{
    this.url = this.router.url+"/withdraw";
  }

  //sets the form data to the object before stringifying to the desired json format
  setSubmitDeposit(){
    //console.log(this.useExternalAcct); 
    this.submitTransAccount.accountNumber = this.withdrawForm.get("accountNumber").value;
    this.submitTransAccount.routingNumber = this.withdrawForm.get("routingNumber").value;
    this.transAcctArray.push(this.submitTransAccount);
    this.submitTrans.accounts = this.transAcctArray;
    this.submitTrans.transactionAmount = this.withdrawForm.get("transactionAmount").value;
  }
}

