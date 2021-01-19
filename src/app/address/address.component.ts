import { Component, OnInit, Inject, ViewChild, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile/profile.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
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
      city: [,[Validators.required, Validators.pattern('^[a-zA-Z](?=[^A-Z\W])[a-z]*$')]],
      state: [,Validators.required],
      zipcode: [,[Validators.required,Validators.pattern('^[0-9]{5}$')]], 
    })
  }

  get firstLine(){
    return this.addressForm.get("firstLine");
  }

  get city(){
    return this.addressForm.get("city");
  }

  get state(){
    return this.addressForm.get("state");
  }

  get zipcode(){
    return this.addressForm.get("zipcode");
  }

  onSubmit(){
    console.log(this.addressForm.value)
     this.profileService.saveAddress(this.addressForm.value)
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
