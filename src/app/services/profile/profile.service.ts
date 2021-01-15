import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  profileUrl = `http://localhost:8080/myaccount/profile`;

  retrieveProfile()
  {
    return this.http.get<any>(this.profileUrl)
  }

  addressUrl = `http://localhost:8080/myaccount/profile/address`;

  saveAddress(formData)
  {
    this.http.put(this.addressUrl, formData).subscribe(
      data=>console.log("success!",data),
      error=>console.log("couldn't post because",error)
    );
  }

  
}
