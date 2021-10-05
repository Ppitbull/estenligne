import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/entities/user';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { LoaderDataService } from 'src/app/shared/services/loader-data/loader-data.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

@Component({
  selector: 'app-load-user-datas',
  templateUrl: './load-user-datas.component.html',
  styleUrls: ['./load-user-datas.component.scss']
})
export class LoadUserDatasComponent implements OnInit {

  loadText:String="Wait a moment..."
  constructor(
    private loaderDataService:LoaderDataService,
    private userProfileService:UserProfilService,
    private loginService:LoginService,
    private chatService:ChatService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginService.registerPlateform()
    .then((result:ActionStatus)=>{
      let data=result.result;
      let user:User=new User();
      user.hydrate(data["userProfile"]);
      this.userProfileService.setUser(user);
      return this.loaderDataService.fcmRegistration(data["id"],data["pushNotificationToken"])
    })
    .then(()=>{
      this.loadText="Download user data..."
      return this.chatService.getAllDiscutionList()
    })
    .then((result:ActionStatus)=>{
      console.log(this.chatService.listDiscusions.getValue())
      return this.router.navigate(["chat"])
    })
    .catch((error)=>{

    })
  }

}
