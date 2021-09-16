import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserProfilService } from '../user-profil/user-profil.service';
import { EntityID } from '../../entities/entityid';
import { EventService } from '../../utils/services/events/event.service';
import { UserService } from '../user/user.service';
import { ActionStatus } from '../../utils/services/firebase';
import { User } from '../../entities/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService:AuthService,
    private userProfil:UserProfilService,
    private eventService:EventService,
    private usersService:UserService
  ) { }

  loginUser(email:string,password:string):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      let currentUserID:EntityID;
      let user=new User();
      user.email=email;
      user.password=password;

      this.authService.authLogin(user)
      .then((result:ActionStatus)=>{
        currentUserID=result.result;
        return this.userProfil.getCurrentUserProfil(currentUserID);
      })
      .then((result:ActionStatus)=>{
        // let user:User=result.result;
        // console.log(user)
        // //chargement des commentaires associé a une candidature
        // if(user.accountType==AccountType.ETUDIANT) return Promise.all([this.dossierCandidatureService.getCandidatureOfCandidate(currentUserID),this.commentService.getComment()]);
        // else return Promise.all([this.usersService.getAllUser()])    
      })
      // .then((result:ActionStatus[])=>
      // {
      //   this.eventService.loginEvent.next(true);
      //   resolve(new ActionStatus())
      // })
      // .catch((error:ActionStatus)=>{
      //   this.firebaseApi.handleApiError(error);
      //   reject(error)
      // })
    })
  }
}
