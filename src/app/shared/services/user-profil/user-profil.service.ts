import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityID } from '../../entities/entityid';
import { User } from '../../entities/user';
import { ActionStatus } from '../../utils/services/firebase';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class UserProfilService {
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private localStorageService:LocalStorageService,
    private userService:UserService
    ) {
    
    this.localStorageService.getSubjectByKey("user_profil").subscribe((userObj:any)=>{
      let u1=new User();
      u1.id.setId(1)
      u1.nom="Joel";
      this.currentUser.next(u1);
      if(userObj){
        let user:User=new User()
        user.hydrate(userObj)
        this.currentUser.next(user)
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
}
