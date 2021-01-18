import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {AccountListService} from '../services/account-list/account-list.service';
import { RegistrationService} from '../services/registration/registration.service';

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

export class NewAccount{
     accountType?: string;
     transactions?: Transactions[]
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
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {

  newOrExistingAcctForm: FormGroup;
  createAccountForm: FormGroup;

  accountsArray : Account[];

  //used to set the form to the object model for JSON payload
  useExternalAcct: boolean = false;
  submitAccount: NewAccount = {};
  submitTrans: Transactions = {};
  submitTransAccount: TransAccount = {};
  transAcctArray: TransAccount[] = [];
  transArray: Transactions[] = [];

  url = 'http://localhost:8080/myaccount/create';
  urlMyAccount = 'http://localhost:8080/myaccount';
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateaccountComponent>,
    private http: HttpClient,
    private listService: AccountListService,
    private registrationService: RegistrationService) { }

  ngOnInit(): void {

    this.getAllAccounts();

    this.createAccountForm = this.fb.group({
      accountType: [,Validators.required],
      transactionAmount: [, [Validators.required,Validators.pattern('^\\d+\\.\\d\\d$')]], //must be a double XX.XX
      internalAccount: this.fb.array([
        this.internalAccountForm()
      ]),
      externalAccountBoolean:[],
      externalAccount: this.fb.array([
      ])
      })
  }

  get transactionAmount(){
    return this.createAccountForm.get("transactionAmount")
  }

  get internalAccountArray(){
    return this.createAccountForm.get("internalAccount") as FormArray;
  }

  get accountNumber(){
    return this.externalAccountArray.at(0).get("accountNumber");
  }

  get routingNumber(){
    return this.externalAccountArray.at(0).get("routingNumber");
  }

  internalAccountForm(){
    return this.fb.group({
      accountNumber:[,Validators.required],
    })
  }

  get externalAccountArray(){
    return this.createAccountForm.get("externalAccount") as FormArray;
  }

  externalAccountForm(){
    return this.fb.group({
      accountNumber:[,[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      routingNumber:[,[Validators.required, Validators.pattern('091000022')]]
    })
  }

  onChange(){
    //toggles between true or false;
    if(this.useExternalAcct){
      this.useExternalAcct = false
    }
    else{
      this.useExternalAcct = true;
    }

    if(this.useExternalAcct){
      console.log("checked");
      this.internalAccountArray.removeAt(0);
      this.externalAccountArray.push(this.externalAccountForm());
    }
    else{
      console.log("unchecked")
      this.externalAccountArray.removeAt(0);
      this.internalAccountArray.push(this.internalAccountForm());
    }
  }

  //sets the form data to the object before stringifying to the desired json format
  setSubmitAccount(){
    console.log(this.useExternalAcct);
    if(this.useExternalAcct){
      this.submitTransAccount.accountNumber = this.externalAccountArray.at(0).get("accountNumber").value;
      this.submitTransAccount.routingNumber = this.externalAccountArray.at(0).get("routingNumber").value;
    }
    else{
      this.submitTransAccount.accountNumber = this.internalAccountArray.at(0).get("accountNumber").value;
    }
    this.transAcctArray.push(this.submitTransAccount);
    this.submitTrans.accounts = this.transAcctArray;
    this.submitTrans.transactionAmount = this.createAccountForm.get("transactionAmount").value;
    this.transArray.push(this.submitTrans);
    this.submitAccount.transactions = this.transArray;
    this.submitAccount.accountType = this.createAccountForm.get("accountType").value;
  }

  existTransactionAcct(){
    return this.fb.group({
      account: [,Validators.required]
    })
  }

  onSubmit(){
    //console.log(this.createAccountForm.value);
    this.setSubmitAccount();
    //console.log(JSON.stringify(this.submitAccount));
    this.registrationService.postToServer(this.url, JSON.stringify(this.submitAccount)).subscribe(
      response=>alert("account created!")
    );
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  getAllAccounts()
  {
    this.listService.retrieveAllAccounts(this.urlMyAccount).subscribe(
      response => {
        console.log(response);
        // @ts-ignore
        this.accountsArray = response; }
    );
  }
}
