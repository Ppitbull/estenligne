import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { MustMatch } from 'src/app/shared/utils/helpers/validators';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitedForm:boolean=false;
  waitResponse=false;
  errorText="";
  successText="";
  form:FormGroup
  constructor(private formBuilder:FormBuilder,
    private loginService:LoginService,
    private router:Router) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      email:new FormControl('',),
      phoneNumber:new FormControl(''),
      password:new FormControl('',[Validators.required]),
    })
  }
  submitForm()
  {
    this.submitedForm=true;
    this.errorText="";
    this.successText=""
    if(!this.form.valid) return;
    if(this.form.value.email=="" && (this.form.value.phoneNumber=="" || this.form.value.phoneNumber==null || this.form.value.phoneNumber==undefined) ) 
    {
      this.errorText="You must specify either email or phone number";
    }
    let pseudo=this.form.value.email==""?this.form.value.phoneNumber.internationalNumber:this.form.value.email;
    this.waitResponse=true;
    // console.log("pseudo: ",pseudo,"Password ",this.form.value.password)
    this.loginService.loginUser(pseudo,this.form.value.password)
    .then((value:ActionStatus)=>{
      this.waitResponse=false;
      this.errorText="";
      this.successText="Successful authentification";
      if(value.code==ActionStatus.SUCCESS_END) setTimeout(()=>this.router.navigate(["load-data"]))
      else setTimeout(()=>this.router.navigate(["create-profil"]))
    })
    .catch((error:ActionStatus)=>{
      this.waitResponse=false;
      this.successText="";
      this.errorText=error.message;
      console.log(error);
    })
  }
}
