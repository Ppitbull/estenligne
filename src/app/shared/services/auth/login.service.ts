import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserProfilService } from '../user-profil/user-profil.service';
import { EntityID } from '../../entities/entityid';
import { EventService } from '../../utils/services/events/event.service';
import { UserService } from '../user/user.service';
import { ActionStatus } from '../../utils/services/firebase';
import { User } from '../../entities/user';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { CRequest } from '../../utils/services/http/client/crequest';
import { CResponse } from '../../utils/services/http/client/cresponse';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService:AuthService,
    private userProfil:UserProfilService,
    private eventService:EventService,
    private usersService:UserService,
    private restApiService:RestApiClientService
  ) { }

  loginUser(user:User):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      this.authService.authLogin(user)
      .then((result:ActionStatus)=>{
        user=result.result;
        // this.userProfil.setUser(user);
        if(result.apiCode==ActionStatus.NOT_VALID_ACCOUNT_ERROR) result.code=ActionStatus.SUCCESS;
        else result.code=ActionStatus.SUCCESS_END;
        this.eventService.loginEvent.next(true);
        return resolve(result);
      })
      .catch((error:ActionStatus)=>{
        reject(error)
      })
    })
  }

  registerPlateform():Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      this.restApiService.sendRequest(new CRequest()
      .url("deviceused?deviceplateform=4")
      .json()
      .header("Authorization",`Bearer ${this.restApiService.headerKey.getValue().get("token")}`)
      .put()
      )
      .then((result:ActionStatus)=>{
        let response:CResponse=result.result
        result.result=response.getData();
        resolve(result)
      })
      .catch((error:ActionStatus)=>reject(error))
    })
  }

}
