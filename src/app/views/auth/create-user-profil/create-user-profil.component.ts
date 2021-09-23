import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/entities/user';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { MustMatch } from 'src/app/shared/utils/helpers/validators';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

@Component({
  selector: 'app-create-user-profil',
  templateUrl: './create-user-profil.component.html',
  styleUrls: ['./create-user-profil.component.scss']
})
export class CreateUserProfilComponent implements OnInit {
  submitedForm:boolean=false;
  waitResponse=false;
  form:FormGroup
  errorText="";
  successText="";
  constructor(private formBuilder:FormBuilder,
    private profilService:UserProfilService,
    private loginService:LoginService,
    private router:Router) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      pseudo:new FormControl('',[Validators.required]),
      about:new FormControl('',[Validators.required]),
    })
  }

  submitForm()
  {
    this.submitedForm=true;
    if(this.form.invalid) return;

    this.waitResponse=true;
    let user:User = new User()
    user.hydrate(this.form.value);
    this.profilService.saveUserProfil(user)
    .then((result:ActionStatus)=>{
      this.errorText="";
      this.successText="Profil saved successfuly";
      return this.loginService.registerPlateform()
    })
    .then((result:ActionStatus)=>{
      this.waitResponse=false;
      this.errorText="";
      this.successText="Device saved successfuly";
      setTimeout(()=>this.router.navigate(["load-data"]),200)
    })
    .catch((error:ActionStatus)=>{
      this.waitResponse=false;
      this.successText="";
      this.errorText=error.message;
      console.log(error)
    })


  }

}
