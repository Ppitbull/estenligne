import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { filter, mergeScan, scan, switchMap, switchMapTo } from 'rxjs/operators';
import { EntityID } from '../../entities/entityid';
import { User } from '../../entities/user';
import { ActionStatus } from '../../utils/services/firebase';
import { CRequest } from '../../utils/services/http/client/crequest';
import { CResponse } from '../../utils/services/http/client/cresponse';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../localstorage/localstorage.service';
// import { AuthService } from '../auth/auth.service';

import * as db_branch_builder from "./../../utils/functions/db-branch.builder"


@Injectable({
  providedIn: 'root'
})
export class UserService {

  listUser: Map<String, User> = new Map<string, User>();
  usersSubject: BehaviorSubject<Map<String, User>> = new BehaviorSubject<Map<String, User>>(this.listUser);



  constructor(
    private localStorageService:LocalStorageService,
    private apiService:RestApiClientService
  ) {

    this.localStorageService.getSubjectByKey("data_users").subscribe((value)=>{
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
    // if (!this.listUser.has(user.id.toString())) {  }
    // this.listUser.set(user.id.toString(), user)
    // this.usersSubject.next(this.listUser);
    this.listUser.set(user.id.toString(),user);
    this.setListUser(this.listUser);

  }

  // recuperer les informations d'un utilisateur
  getUserById(userID: EntityID): Promise<ActionStatus> {
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
