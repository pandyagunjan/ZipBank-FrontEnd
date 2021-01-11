import { Component, OnInit } from '@angular/core';
import { LoginService} from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  isUsernameValid = true;
  error: any = null;

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.loginService
      .errorMessage
      .subscribe(errorMessage => {
        this.error = errorMessage;
      });
  }

  validateUsername(): void {
    const pattern = RegExp(/^[\w-.]*$/);
    if (pattern.test(this.username)) {
      this.isUsernameValid = true;
    } else {
      this.isUsernameValid = false;
    }
  }

  // tslint:disable-next-line:typedef
  onKey(event: any, type: string){
    if (type === 'username') {
      this.username = event.target.value;
    } else if (type === 'password'){
      this.password = event.target.value;
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit(){
    if (this.isUsernameValid){
      this.loginService.login(this.username, this.password);
    }
  }

}
