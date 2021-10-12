import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityID } from '../../entities/entityid';
import { User } from '../../entities/user';
import { EventService } from '../../utils/services/events/event.service';
import { ActionStatus } from '../../utils/services/firebase';
import { CRequest } from '../../utils/services/http/client/crequest';
import { CResponse } from '../../utils/services/http/client/cresponse';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class UserProfilService {
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private restApi:RestApiClientService,
    private eventService:EventService
    ) {

    this.localStorageService.getSubjectByKey("user_profil").subscribe((userObj:any)=>{
      if(userObj){
        let user:User=new User()
        user.hydrate(userObj)
        this.currentUser.next(user)
      }
    })
    this.eventService.logoutEvent.subscribe((value)=>{
      if(value)
      {
        this.currentUser.next(null)
      }
    })
  }
  setUser(user:User):void
  {
    this.localStorageService.setData("user_profil",user.toString());
  }
    /*
   * resetPassword is used to reset your password.
   */
    resetPassword() {
      // this.toastr.success('Email Sent');
      // this.router.navigate(['/login']);
    }
    getCurrentUserProfil(userID:EntityID):Promise<ActionStatus>
    {
      return new Promise<ActionStatus>((resolve,reject)=>{
        this.userService.getUserById(userID)
        .then((result:ActionStatus)=>{
          this.setUser(result.result);
          resolve(result);
        })
        .catch((error:ActionStatus)=>reject(error))
      })
    }

    resetDataUser(user)
    {
      // this.localStorageService.setUserData({
      //   isLoggedIn:this.isLoggedIn,
      //   user
      // })
    }

    saveUserProfil(user:User):Promise<ActionStatus>
    {
      return new Promise<ActionStatus>((resolve,reject)=>{
        this.restApi.sendRequest(
          new CRequest()
          .url("userprofile")
          .json()
          .post()
          .header("Authorization",`Bearer ${this.restApi.headerKey.getValue().get("token")}`)
          .data({
            "identity":this.currentUser.getValue().getIdentity(),
            "username":user.username,
            "about":user.about
          })
        ).then((result:ActionStatus)=>{
          user.hydrate(result.result.getData())
          this.currentUser.getValue().hydrate(user.toString());
          this.currentUser.next(this.currentUser.getValue())
          result.result=this.currentUser.getValue()
          this.userService.setUser(user)
          resolve(result)
        })
        .catch((error:ActionStatus)=>{
          let response:CResponse=error.result.response;
          switch (response.getStatus())
          {
            case 409:
              let result:ActionStatus=new ActionStatus();
              return resolve(result)
          }
        })
      })
    }
}
