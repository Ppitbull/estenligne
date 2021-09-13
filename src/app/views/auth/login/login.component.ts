import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/utils/helpers/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitedForm:boolean=false;
  waitResponse=false;
  form:FormGroup
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      emailOrPhoneNumber:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
    })
  }
  submitForm()
  {
    this.submitedForm=true;
    console.log(this.form.valid,this.form.errors)
    if(!this.form.valid) return;
    this.waitResponse=true;
    console.log("Form value",this.form.value)
  }
}
