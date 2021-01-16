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
    dateOfBirth: ['YYYY-MM-DD', [Validators.required, Validators.pattern('^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$')]], //YYYY-MM-DD
    socialSecurity: [,[Validators.required, Validators.pattern('^[0-9]{9}$')]], //9 numbers
    email: [,[Validators.required,Validators.email]],
    phoneNumber: [,[Validators.required,Validators.pattern('^[0-9]{10}$')]], //10 numbers
    address: this.fb.group({
      firstLine: [, Validators.required],
      secondLine: [],
      city: [, [Validators.required, Validators.pattern('^[a-zA-Z](?=[^A-Z\\W])[a-z]*$')]], //capital letter for 1st letter optional, no captialized elsewhere
      state: [, Validators.required],
      zipcode: [, [Validators.required,Validators.pattern('^[0-9]{5}$')]] //5 numbers
    }),
    login: this.fb.group({
      username: [, Validators.required],
      password: [, [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]] //min 8 chars, at least 1 uppercase, 1 lowercase, 1 number
    }),
    accounts: this.fb.array([this.newAccounts()])
    });

  }

  get firstName(){
    return this.profileForm.get("firstName");
  }

  get lastName(){
    return this.profileForm.get("lastName");
  }

  get dateOfBirth(){
    return this.profileForm.get("dateOfBirth");
  }

  get socialSecurity(){
    return this.profileForm.get("socialSecurity");
  }

  get email(){
    return this.profileForm.get("email");
  }

  get phoneNumber(){
    return this.profileForm.get("phoneNumber");
  }

  get firstLine(){
    return this.profileForm.get("address").get("firstLine");
  }

  get city(){
    return this.profileForm.get("address").get("city");
  }

  get state(){
    return this.profileForm.get("address").get("state");
  }

  get zipcode(){
    return this.profileForm.get("address").get("zipcode");
  }

  get username(){
    return this.profileForm.get("login").get("username");
  }

  get password(){
    return this.profileForm.get("login").get("password");
  }

  get accountType(){
    return this.accountsArray.get("accountType")
  }

  get transactionAmount(){
    return this.transactionsArray.get("transactionAmount")
  }

  get accountNumber(){
    return this.transactionAccountsArray.get("accountNumber")
  }

  get routingNumber(){
    return this.transactionAccountsArray.get("routingNumber")
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

  newAccounts(){
    return this.fb.group({
        accountType: [,Validators.required],
        transactions: this.fb.array([this.newTransaction()])
    });
  }

  newTransaction(){
    return this.fb.group({
      transactionAmount: [, [Validators.required,Validators.pattern('^(((\d{1,3},?)(\d{3},?)+|\d{1,3})|\d+)(\.\d{1,2})?$')]], //must be a double XX.XX
      accounts: this.fb.array([this.newTransactionAcct()])
    });
  }

  newTransactionAcct(){
    return this.fb.group({
      accountNumber: [, [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]{10}$')]], //10 numbers
      routingNumber: [, Validators.required,Validators.pattern('091000022')], //must be this number
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
    this.postToServer();

  }


}
