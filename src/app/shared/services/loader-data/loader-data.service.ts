import { Injectable } from '@angular/core';
import { ActionStatus } from '../../utils/services/firebase';
import { CRequest } from '../../utils/services/http/client/crequest';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { UserProfilService } from '../user-profil/user-profil.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderDataService {

  constructor(
    private restApiService:RestApiClientService,
    private userProfilService:UserProfilService
  ) { }

  fcmRegistration(deviceUsedID:number,fcmToken:String="cedric"):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      this.restApiService.sendRequest(
        new CRequest()
        .url(`deviceused/registerfcmtoken?deviceusedid=${deviceUsedID}&fcmtoken=${fcmToken}`)
        .patch()
        .header("Authorization",`Bearer ${this.restApiService.headerKey.getValue().get("token")}`)
      )
      .then((result:ActionStatus)=>resolve(new ActionStatus()))
      .catch((error:ActionStatus)=>reject(new ActionStatus()))
    })
  }


}
