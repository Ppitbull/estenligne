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

  loginUser(email:string,password:string):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      let user:User=new User();
      user.hydrate({
        email,
        password,
        phoneNumber:"+237000000000"
      })
      this.authService.authLogin(user)
      .then((result:ActionStatus)=>{
        user=result.result;
        this.userProfil.setUser(user);
        if(user.nom=="") result.code=ActionStatus.SUCCESS;        
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
      .url("/deviceused?deviceplateform=4")
      .json()
      .header("Set-Cookie",this.restApiService.headerKey.getValue().get("Set-Cookie"))
      .put()
      )
      .then((result:ActionStatus)=>{
        resolve(new ActionStatus())
      })
      .catch((error:ActionStatus)=>reject(error))
    })
  }

}
