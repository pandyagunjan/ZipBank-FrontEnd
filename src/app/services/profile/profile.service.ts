import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API_URL} from '../../app.apiurl';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  profileUrl =   `${API_URL}/myaccount/profile`;

  retrieveProfile()
  {
    return this.http.get<any>(this.profileUrl);
  }

  addressUrl =   `${API_URL}/myaccount/profile/address`;

  saveAddress(formData)
  {
    this.http.put(this.addressUrl, formData).subscribe(
      data=>console.log("success!",data),
      error=>console.log("couldn't post because",error)
    );
  }

  emailUrl =   `${API_URL}/myaccount/profile/email`;

  saveEmail(formData)
  {
    this.http.put(this.emailUrl, formData).subscribe(
      data=>console.log("success!",data),
      error=>console.log("couldn't post because",error)
    );
  }

  phoneUrl =   `${API_URL}/myaccount/profile/phone`;

  savePhone(formData)
  {
    this.http.put(this.phoneUrl, formData).subscribe(
      data=>console.log("success!",data),
      error=>console.log("couldn't post because",error)
    );
  }

}
