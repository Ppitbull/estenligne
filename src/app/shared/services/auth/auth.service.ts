import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { EntityID } from '../../entities/entityid';
import { User } from '../../entities/user';
import { EventService } from '../../utils/services/events/event.service';
import { ActionStatus } from '../../utils/services/firebase';
import { CRequest } from '../../utils/services/http/client/crequest';
import { CResponse } from '../../utils/services/http/client/cresponse';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { LocalStorageService } from '../localstorage/localstorage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private localStorageService: LocalStorageService,
    private apiService:RestApiClientService,
    private eventService: EventService,
  ) {
    this.localStorageService.getSubjectByKey("auth_data").subscribe((userData:any) => {
      if(userData) this.isLoggedIn.next(userData.isLoggedIn);
    });


  }
  setAuth(logged:{isLoggedIn:boolean})
  {
    this.localStorageService.setData("auth_data",logged);
  }

  /*
   * logOut function is used to sign out .
   */
  logOut() {
    this.setAuth({isLoggedIn:false})
    // ;
    // this.apiService.sendRequest(new KRequest().)
    // this.note.showNotification('succes', 'Vous avez été déconnecté!');
    localStorage.clear();
  }

  /**
   *  Create an account on the drupal platform
   *
   */
  createAccount(user: User): Promise<ActionStatus> {
    // console.log(user)
    return new Promise((resolve, reject) => {
      let userJson=user.toString();
      userJson.phoneNumber= userJson.phoneNumber.replaceAll(" ","");

      if(userJson.email=="") delete userJson["email"];
      if(userJson.phoneNumber=="") delete userJson["phoneNumber"]

      console.log("Value user ",userJson)
     this.apiService.sendRequest(new CRequest().post().url("account/register").json().data(userJson))
     .then((result:ActionStatus)=>{
       let actionStatus=new ActionStatus();
       switch (result.result.getStatus())
       {
         case 201:
          return resolve(actionStatus);
        case 409:
          actionStatus.message= result.result.getData()
          actionStatus.apiCode=ActionStatus.INVALID_ARGUMENT_ERROR;
        case 400:
          actionStatus.message="Email or phone number already exist";
          actionStatus.apiCode=ActionStatus.RESSOURCE_ALREADY_EXIST_ERROR
          return reject(actionStatus)
       }
     })
     .catch((error:ActionStatus)=>{
       console.log("Error ",error)
       let actionStatus=new ActionStatus();
      //  if(error.result.message instanceof Array && actionStatus.message.length) actionStatus.message=error.result.message[0].
       actionStatus.message=error.result.message;

       actionStatus.apiCode=ActionStatus.UNKNOW_ERROR;
        reject(actionStatus)
     })
    });

  }


  // Login into your account
  authLogin(user:User): Promise<ActionStatus> {
    return new Promise((resolve, reject) => {
      this.apiService.sendRequest(
        new CRequest()
        .url("account/signin")
        .post()
        .json()
        .data(user.toString())
      )
        .then((result: ActionStatus) => {
          let user:User=new User();
          console.log("Result ",result)
          user.hydrate(result.result.getData());
          result.result = user;
          this.setAuth({isLoggedIn:true})
          this.apiService.setHeaderToStorage("cookies_auth",result.result.getHeader("Set-Cookie"))
          resolve(result);
        })
        .catch((error: ActionStatus) => {
          let actionStatus=new ActionStatus();
          let response:CResponse=error.result.response;
          switch (response.getStatus())
          {
            case 201:
            case 200:
            case 202:
              return resolve(actionStatus);
            case 400:
              actionStatus.message= "One field missed"
              actionStatus.apiCode=ActionStatus.INVALID_ARGUMENT_ERROR;
            case 404:
              actionStatus.message="Email/Phone number or password incorect";
              actionStatus.apiCode=ActionStatus.RESSOURCE_NOT_FOUND_ERROR
              return reject(actionStatus)
          }
          reject(error);
        })
    });
  }
}
