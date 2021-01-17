import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export class newUser{
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  phoneNumber?: string;
  socialSecurity?: string;
  address?: Address;
  login?: Login;
  accounts?: Account[];
}

export class Address{
  firstLine?: string;
  secondLine?: string;
  city?: string;
  state?: string;
  zipcode?: string;
}

export class Login{
  username?: string;
  password?: string;
}

export class Account{
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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  profileForm: FormGroup;
  url = 'http://localhost:8080/openaccount';

    //used to set the form to the object model for JSON payload

    submitNewUser: newUser = {};
    submitAddress: Address = {};
    submitLogin: Login = {};
    submitAccount: Account = {};
    submitTrans: Transactions = {};
    submitTransAccount: TransAccount = {};
    accountArray: Account[] = [];
    transAcctArray: TransAccount[] = [];
    transArray: Transactions[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  postToServer(){
    this.http.post(this.url, JSON.stringify(this.submitNewUser)).subscribe(
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
    firstLine: [, Validators.required],
    secondLine: [],
    city: [, [Validators.required, Validators.pattern('^[a-zA-Z](?=[^A-Z\\W])[a-z]*$')]], //capital letter for 1st letter optional, no captialized elsewhere
    state: [, Validators.required],
    zipcode: [, [Validators.required,Validators.pattern('^[0-9]{5}$')]], //5 numbers
    username: [, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z0-9-_]{8,20}')]], //must start with an alpanumberic, 8-20 characters long
    password: [, [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]], //min 8 chars, at least 1 uppercase, 1 lowercase, 1 number
    accountType: [,Validators.required],
    transactionAmount: [, [Validators.required,Validators.pattern('^\\d+\\.\\d\\d$')]], //digits and 2 decimal places
    accountNumber:[,[Validators.required, Validators.pattern('^[0-9]{10}$')]], //10 digits
    routingNumber:[,[Validators.required, Validators.pattern('091000022')]]
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
    return this.profileForm.get("firstLine");
  }

  get city(){
    return this.profileForm.get("city");
  }

  get state(){
    return this.profileForm.get("state");
  }

  get zipcode(){
    return this.profileForm.get("zipcode");
  }

  get username(){
    return this.profileForm.get("username");
  }

  get password(){
    return this.profileForm.get("password");
  }

  get accountType(){
    return this.profileForm.get("accountType")
  }

  get transactionAmount(){
    return this.profileForm.get("transactionAmount")
  }

  get accountNumber(){
    return this.profileForm.get("accountNumber")
  }

  get routingNumber(){
    return this.profileForm.get("routingNumber")
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.log(this.profileForm.value);
    this.setSubmitUser();
    //console.log(JSON.stringify(this.submitNewUser))
    this.postToServer();
  }

  setSubmitUser(){
    this.submitTransAccount.accountNumber = this.profileForm.get("accountNumber").value;
    this.submitTransAccount.routingNumber = this.profileForm.get("routingNumber").value;
    this.transAcctArray.push(this.submitTransAccount);
    this.submitTrans.accounts = this.transAcctArray;
    this.submitTrans.transactionAmount = this.profileForm.get("transactionAmount").value;
    this.transArray.push(this.submitTrans);
    this.submitAccount.transactions = this.transArray;
    this.submitAccount.accountType = this.profileForm.get("accountType").value;
    this.submitNewUser.accounts = this.accountArray;
    this.accountArray.push(this.submitAccount);
    this.submitLogin.username = this.profileForm.get("username").value;
    this.submitLogin.password = this.profileForm.get("password").value;
    this.submitNewUser.login = this.submitLogin;
    this.submitAddress.firstLine = this.profileForm.get("firstLine").value;
    this.submitAddress.secondLine = this.profileForm.get("secondLine").value;
    this.submitAddress.city = this.profileForm.get("city").value;
    this.submitAddress.state = this.profileForm.get("state").value;
    this.submitAddress.zipcode = this.profileForm.get("zipcode").value;
    this.submitNewUser.address = this.submitAddress;
    this.submitNewUser.firstName = this.profileForm.get("firstName").value;
    this.submitNewUser.middleName = this.profileForm.get("middleName").value;
    this.submitNewUser.lastName = this.profileForm.get("lastName").value;
    this.submitNewUser.dateOfBirth = this.profileForm.get("dateOfBirth").value;
    this.submitNewUser.email = this.profileForm.get("email").value;
    this.submitNewUser.phoneNumber = this.profileForm.get("phoneNumber").value;
    this.submitNewUser.socialSecurity = this.profileForm.get("socialSecurity").value;
  }

}
