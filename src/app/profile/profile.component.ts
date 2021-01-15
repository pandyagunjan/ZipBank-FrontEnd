import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile/profile.service';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatDialogRef} from "@angular/material/dialog"
import { AddressComponent } from '../address/address.component';
import {EmailComponent} from '../email/email.component';
import {PhoneComponent} from '../phone/phone.component';



export class Profile {
    constructor(
    public phoneNumber: string,
    public email: string,
    public address: Address
    )
    {}
  }

export class Address{
  constructor(
    public firstLine: string,
    public secondLine: string,
    public city: string,
    public state: string,
    public zipcode: string
  )
  {}
}
    
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  profiles : Profile;

  constructor(private profileService: ProfileService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile()
  {
    this.profileService.retrieveProfile().subscribe(
      response => {
        console.log(response); //for debugging
        this.profiles = response;
      });
      console.log(this.profiles.email)
  }

  editAddress()
  {
    this.dialog.open(AddressComponent);
    this.dialog.afterAllClosed.subscribe(()=>this.getProfile()); //refreshes the page after update
  }

  editEmail()
  {
    this.dialog.open(EmailComponent);
    this.dialog.afterAllClosed.subscribe(()=>this.getProfile()); //refreshes the page after update
  }

  editPhone() {
    this.dialog.open(PhoneComponent);
    this.dialog.afterAllClosed.subscribe(()=>this.getProfile()); //refreshes the page after update
  }


}
