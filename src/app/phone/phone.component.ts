import { Component, OnInit, Inject, ViewChild, AfterViewInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile/profile.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  phoneForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PhoneComponent>,
    private fb: FormBuilder,
    private profileService: ProfileService,
  )
  { }

  ngOnInit(): void {

    this.phoneForm = this.fb.group({
      phoneNumber: [,Validators.required],
    })
  }

  onSubmit(){
    console.log(this.phoneForm.value)
     this.profileService.savePhone(this.phoneForm.value)
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
