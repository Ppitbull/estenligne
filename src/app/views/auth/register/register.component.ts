import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/entities/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MustMatch } from 'src/app/shared/utils/helpers/validators';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitedForm:boolean=false;
  waitResponse=false;
  form:FormGroup
  errorText="";
  successText="";
  constructor(private formBuilder:FormBuilder,private authService:AuthService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      email:new FormControl('',[Validators.pattern('^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,6}')]),
      password:new FormControl('',[Validators.required]),
      repeatpassword:new FormControl('',[Validators.required]),
      phoneNumber:new FormControl(''),
      rememberMe:new FormControl("")
    },
    {
      validator: MustMatch('password','repeatpassword')
    })
    this.form.controls.email.valueChanges.subscribe((change)=>{
      if(change.length!=0) {
        this.form.controls.email.setValidators(Validators.pattern('^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,6}'));
        this.form.controls.phoneNumber.setErrors(null)
      }
    })
  }

  submitForm()
  {
    this.submitedForm=true;
    if(this.form.value.email.length==0 && this.form.value.phoneNumber.length==0)
    {
      this.errorText="You must specify at least one value between email and phone number"
      this.form.controls.email.setErrors(Validators.required)
      this.form.controls.phoneNumber.setErrors(Validators.required)
    }
    if(this.form.invalid) return;

    this.waitResponse=true;
    let user:User = new User()
    user.hydrate(this.form.value);
    user.phoneNumber=this.form.value.phoneNumber.internationalNumber;
    this.authService.createAccount(user)
    .then((result:ActionStatus)=>{
      this.waitResponse=false;
      this.successText="Account created successful. Please login to continue..."
    })
    .catch((error:ActionStatus)=>{
      this.waitResponse=false;
      this.errorText=error.message;
    })
  }

}
