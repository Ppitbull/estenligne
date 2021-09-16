import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/entities/user';
import { MustMatch } from 'src/app/shared/utils/helpers/validators';

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
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      pseudo:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
    })
  }

  submitForm()
  {
    this.submitedForm=true;
    if(this.form.invalid) return;

    this.waitResponse=true;
    let user:User = new User()
    user.hydrate(this.form.value);
    user.phoneNumber=this.form.value.phoneNumber.internationalNumber;

  }

}
