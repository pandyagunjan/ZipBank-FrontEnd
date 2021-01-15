import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile/profile.service';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatDialogRef} from "@angular/material/dialog"
import { AddressComponent } from '../address/address.component';


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
  }

}
