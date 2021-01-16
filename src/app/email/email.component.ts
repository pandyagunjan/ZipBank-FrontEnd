import { Component, OnInit, Inject, ViewChild, AfterViewInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile/profile.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  emailForm: FormGroup;

  constructor(    
    public dialogRef: MatDialogRef<EmailComponent>,
    private fb: FormBuilder,
    private profileService: ProfileService,
    ) { }

    ngOnInit(): void {

      this.emailForm = this.fb.group({
        email: [,[Validators.required, Validators.email]],
      })
    }

    get email(){
      return this.emailForm.get("email");
    }
  
    onSubmit(){
      console.log(this.emailForm.value)
       this.profileService.saveEmail(this.emailForm.value)
    }
  
    onNoClick(): void{
      this.dialogRef.close();
    }

}
