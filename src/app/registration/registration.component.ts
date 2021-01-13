import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  profileForm: FormGroup;

  url = 'http://localhost:8080/openaccount';

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  postToServer(){
    this.http.post(this.url, this.profileForm.value).subscribe(
      data => console.log('success!', data),
      error => console.log('couldn\'t post because', error)
    );
  }

  ngOnInit(): void{

  this.profileForm = this.fb.group({
    firstName: [, Validators.required],
    middleName: [],
    lastName: [, Validators.required],
    dateOfBirth: [, Validators.required],
    socialSecurity: [, Validators.required],
    email: [, Validators.required],
    phoneNumber: [, Validators.required],
    address: this.fb.group({
      firstLine: [, Validators.required],
      secondLine: [],
      city: [, Validators.required],
      state: [, Validators.required],
      zipcode: [, Validators.required]
    }),
    login: this.fb.group({
      username: [, Validators.required],
      password: [, Validators.required]
    }),
    accounts: this.fb.array([this.newAccounts()])
    });

  }

  newAccounts(){
    return this.fb.group({
        accountType: [],
        transactions: this.fb.array([this.newTransaction()])
    });
  }

  newTransaction(){
    return this.fb.group({
      transactionAmount: [, Validators.required],
      accounts: this.fb.array([this.newTransactionAcct()])
    });
  }

  newTransactionAcct(){
    return this.fb.group({
      accountNumber: [, Validators.required],
      routingNumber: [, Validators.required],
    });
  }

  // only has 1 element
  get accountsArray(){
    return this.profileForm.controls.accounts as FormArray;
  }

  // only has 1 element hence '0'
  get transactionsArray(){
    return (this.profileForm.controls.accounts as FormArray).at(0).get('transactions');
  }

  // only has 1 element hence '0'
  get transactionAccountsArray(){
    return ((this.profileForm.controls.accounts as FormArray).at(0).get('transactions') as FormArray).at(0).get('accounts');
  }



  // tslint:disable-next-line:typedef
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
    this.postToServer();

  }


}
