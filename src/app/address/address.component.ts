import { Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile/profile.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddressComponent>,
    private fb: FormBuilder,
    private profileService: ProfileService,
  )
  { }

  ngOnInit(): void {

    this.addressForm = this.fb.group({
      firstLine: [,Validators.required],
      secondLine: [],
      city: [,Validators.required],
      state: [,Validators.required],
      zipcode: [,Validators.required], 
    })
  }

  onSubmit(){
    console.log(this.addressForm.value)
     this.profileService.saveAddress(this.addressForm.value)
     this.dialogRef.close();
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
