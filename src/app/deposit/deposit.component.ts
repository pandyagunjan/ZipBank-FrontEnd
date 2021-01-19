import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransactionsService} from '../services/transaction/transactions.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import { RegistrationService} from '../services/registration/registration.service';


export class Transactions{
  transactionAmount?: any;
  accounts?: TransAccount[]
}

export class TransAccount{
 accountNumber?: string;
 routingNumber?: string;
}

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  depositForm: FormGroup;
  url: string;

  submitTrans: Transactions = {};
  submitTransAccount: TransAccount = {};
  transAcctArray: TransAccount[] = [];

  constructor(private transactionService: TransactionsService,
              private router: Router,
              public dialogRef: MatDialogRef<DepositComponent>,
              private fb: FormBuilder,
              private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.retrieveAccountUrl();

    this.depositForm = this.fb.group({
      transactionAmount: [, [Validators.required,Validators.pattern('^\\d+\\.\\d\\d$')]], //must be a double XX.XX
      accountNumber:[,[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      routingNumber:[,[Validators.required, Validators.pattern('091000022')]]
    });
  }

  get transactionAmount(){
    return this.depositForm.get('transactionAmount');
  }

  get accountNumber(){
    return this.depositForm.get('accountNumber');
  }

  get routingNumber(){
    return this.depositForm.get('routingNumber');
  }

  deposit(): void{
    this.setSubmitDeposit();
    console.log(this.depositForm.value);
    console.log(JSON.stringify(this.submitTrans));
    console.log(this.url);
    this.registrationService.putToServer(this.url, JSON.stringify(this.submitTrans)).subscribe();
    location.reload();
  }

  private retrieveAccountUrl(): void{
    this.url = this.router.url+"/deposit";
  }

  //sets the form data to the object before stringifying to the desired json format
  setSubmitDeposit(){
    //console.log(this.useExternalAcct);
    this.submitTransAccount.accountNumber = this.depositForm.get("accountNumber").value;
    this.submitTransAccount.routingNumber = this.depositForm.get("routingNumber").value;
    this.transAcctArray.push(this.submitTransAccount);
    this.submitTrans.accounts = this.transAcctArray;
    this.submitTrans.transactionAmount = this.depositForm.get("transactionAmount").value;
  }
}
