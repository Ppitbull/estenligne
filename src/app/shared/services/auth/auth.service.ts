import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../../entities/accounts';
import { EntityID } from '../../entities/entityid';
import { EventService } from '../../utils/services/events/event.service';
import { FireBaseApi, ActionStatus } from '../../utils/services/firebase';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { NotificationsService } from '../notification/notification.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private localStorageService: LocalStorageService,
    private firebaseApi: FireBaseApi,
    private eventService: EventService,
    private note: NotificationsService
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
    this.firebaseApi.signOutApi();
    this.note.showNotification('succes', 'Vous avez été déconnecté!');
    localStorage.clear();
  }

  /**
   *  Create an account on the drupal platform
   *
   */
  createAccount(user: User): Promise<ActionStatus> {

    return new Promise((resolve, reject) => {
      this.firebaseApi.createUserApi(user.email.toString(), user.mdp.toString())
        .then((result: ActionStatus) => {
          user.dateCreation = (new Date()).toISOString();
          user.id = result.result.uid;
          result.result = user;
          resolve(result);
        })
        .catch(e => {
          this.firebaseApi.handleApiError(e);
          reject(e);
        })
    });

  }


  // Login into your account
  authLogin(email?: string, password?: string): Promise<ActionStatus> {

    return new Promise((resolve, reject) => {
      this.firebaseApi.signInApi(email, password)
        .then((result: ActionStatus) => {
          let userID: EntityID = new EntityID();
          userID.setId(result.result.user.uid)
          result.result = userID;
          this.setAuth({isLoggedIn:true})
          resolve(result);
        })
        .catch((error: ActionStatus) => {
          this.firebaseApi.handleApiError(error);
          reject(error);
        })
    });
  }
}
