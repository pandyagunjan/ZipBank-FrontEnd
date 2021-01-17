import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication/authenticationservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  invalidLogin = false;
  invalidLoginMessage = 'Please enter a valid Username & Password';
  error: any = null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

  }

  handleAuth = () => {
    this.authenticationService.executeAuthService(this.username, this.password)
      .subscribe(
        response => {
          this.router.navigateByUrl(`/myaccount`);
          this.invalidLogin = false;
          return response;
        },
        error => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
  }

  passToken = () => {
    this.authenticationService.getAuthenticatedToken();
  }

  // validateUsername(): void {
  //   const pattern = RegExp(/^[\w-.]*$/);
  //   if (pattern.test(this.username)) {
  //     this.isUsernameValid = true;
  //   } else {
  //     this.isUsernameValid = false;
  //   }
  // }
  //
  // // tslint:disable-next-line:typedef
  // onKey(event: any, type: string){
  //   if (type === 'username') {
  //     this.username = event.target.value;
  //   } else if (type === 'password'){
  //     this.password = event.target.value;
  //   }
  // }
  //
  // // tslint:disable-next-line:typedef
  // onSubmit(){
  //   if (this.isUsernameValid){
  //     this.loginService.login(this.username, this.password);
  //   }
  // }

}
