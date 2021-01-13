import { Component, OnInit } from '@angular/core';
import { LoginService} from '../services/login/login.service';
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
  error: any = null;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // this.loginService
    //   .errorMessage
    //   .subscribe(errorMessage => {
    //     this.error = errorMessage;
    //   });
  }

  handleAuth = () => {
    this.authenticationService.executeAuthService(this.username, this.password)
      .subscribe(
        response => {
          this.router.navigateByUrl(`/myaccount/all/:id`);
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
