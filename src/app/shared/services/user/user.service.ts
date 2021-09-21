import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { filter, mergeScan, scan, switchMap, switchMapTo } from 'rxjs/operators';
import { EntityID } from '../../entities/entityid';
import { User } from '../../entities/user';
import { ActionStatus } from '../../utils/services/firebase';
import { CRequest } from '../../utils/services/http/client/crequest';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { LocalStorageService } from '../localstorage/localstorage.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  listUser: Map<any, User> = new Map<any, User>();
  usersSubject: BehaviorSubject<Map<any, User>> = new BehaviorSubject<Map<any, User>>(this.listUser);



  constructor(
    private localStorageService:LocalStorageService,
    private apiService:RestApiClientService
  ) {
    
    this.localStorageService.getSubjectByKey("data_users").subscribe((value)=>{

      //--------------------------Data Test -----------------------------------------------
      let u1=new User();
      u1.id.setId(0);
      u1.nom="Cédric"
      this.listUser.set(0,u1);

      let u2=new User();
      u2.id.setId(1)
      u2.nom="Joel";
      this.listUser.set(1,u2);
      this.usersSubject.next(this.listUser)
  //--------------------------Data Test -----------------------------------------------

      if(!value) return;
      value.forEach((userObj)=>{
        let user:User=new User();
        user.hydrate(userObj);
        this.listUser.clear();
        this.listUser.set(user.id.toString(),user);
      });

      this.usersSubject.next(this.listUser)
    })
  }

  setListUser(users:Map<String,User>)
  {
    this.localStorageService.setData("data_users",Array.from(users.values()))
  }


  getListUser(): User[] {
    let r: User[] = [];
    this.usersSubject.getValue().forEach((value: User) => r.push(value));
    return r;
  }

  setUser(user: User) {
    this.listUser.set(user.id.toString(),user);
    this.setListUser(this.listUser);

  }

  // recuperer les informations d'un utilisateur
  getUserById(userID: EntityID): Promise<ActionStatus> {
    console.log("User Found ",userID,this.listUser)

    return new Promise<any>((resolve, reject) => {
      if (this.listUser.has(userID.toString())) {
        let result: ActionStatus = new ActionStatus();
        result.result = this.listUser.get(userID.toString());
        return resolve(result);
      }
      this.apiService.sendRequest(new CRequest().url("account/getuser"))
      // this.firebaseApi.fetch(db_branch_builder.getBranchOfUser(userID))
        .then((value:ActionStatus)=>{
          let user:User=new User();
          user.hydrate(value.result.getData())
          this.setUser(user);
          value.result=user;
          resolve(value);
        })
        .catch((error:ActionStatus)=>{
          reject(error);
        })
    });
  }

  findUsersByKey(key:String,value:String):User[]
  {
    return Array.from(this.usersSubject.getValue().values())
      .filter((user)=>user[key.toString()]==value)
  }

  updateUser(user: User): Promise<ActionStatus> {
    return new Promise<ActionStatus>((resolve, reject) => {
      
    });
  }
  

}
