import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Discussion, GroupDiscussion, Message } from '../../entities/chat';
import { EntityID } from '../../entities/entityid';
import { ChatReadState, DiscussionType, MessageContentType } from '../../enum/chat.enum';
import { EventService } from '../../utils/services/events/event.service';
import { ActionStatus } from '../../utils/services/firebase';
import { CRequest } from '../../utils/services/http/client/crequest';
import { CResponse } from '../../utils/services/http/client/cresponse';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { UserProfilService } from '../user-profil/user-profil.service';
import { MessageService } from './messages.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    listDiscusions: BehaviorSubject<Discussion[]> = new BehaviorSubject<Discussion[]>([]);

    constructor(
        private eventService:EventService,
        private restApiService:RestApiClientService,
        private userProfilService:UserProfilService,
        private localStorageService:LocalStorageService,
        private messageService:MessageService
        )
    {
      this.localStorageService.getSubjectByKey("discuss_list").subscribe((discussObj)=>{
        this.listDiscusions.next(discussObj.map(d => Discussion.internalBuilder(d)))
      })

    }

    setDiscussion(discuss:Discussion[])
    {
      this.localStorageService.setData("discuss_list",discuss.map((d)=>d.toString()));
    }



    getAllDiscutionList(): Promise<ActionStatus> {
        return new Promise<ActionStatus>((resolve, reject) => {
            this.restApiService.sendRequest(
              new CRequest()
              .get()
              .url(`chatroom/getall?userprofileid=${this.userProfilService.currentUser.getValue().id.toString()}`)
              .header("Authorization",`Bearer ${this.restApiService.headerKey.getValue().get("token")}`)
            )
            .then((result:ActionStatus)=>
            {
              let response:CResponse=result.result;
              this.setDiscussion(response.getData().map((d)=>{
                let disc=Discussion.builder(d);
                if(d.latestMessage.id!=0)
                {
                  let message:Message=Message.build(d.latestMessage);
                  disc.chats.push(message)
                }
                return disc
              }))
              resolve(new ActionStatus())
            })
            .catch((error:ActionStatus)=>{
              reject(error)
            })
        });
    }

    getNumberOfUnReadMessageByIdDiscuss(idDiscussion:EntityID):number
    {
        return
        this.listDiscusions.getValue()
        .find((idDiscuss)=>idDiscuss.id.toString()==idDiscussion.toString())
        .chats
        .filter((message:Message)=>message.read==ChatReadState.UNREAD)
        .length
    }

    createNewPrivateDiscution(discuss):Promise<ActionStatus>
    {
      return new Promise<ActionStatus>((resolve,reject)=>{
        this.restApiService.sendRequest(
          new CRequest()
          .post()
          .url(`chatroom/createprivate?userprofileid=${discuss.userMembers?.[1]?.toString()}&emailAddress=${this.userProfilService.currentUser.getValue().getIdentity()}`)
          .header("Authorization",`Bearer ${this.restApiService.headerKey.getValue().get("token")}`)
          .json()
        )
      })
    }

    createNewGroupDiscution(discuss:Discussion):Promise<ActionStatus>
    {
      return new Promise<ActionStatus>((resolve,reject)=>{
        this.restApiService.sendRequest(
          new CRequest()
          .post()
          .url("groupprofile")
          .header("Authorization",`Bearer ${this.restApiService.headerKey.getValue().get("token")}`)
          .json()
          .data({
            creatorId:discuss.userMembers[0].toString(),
            ...discuss.toString(),
          })
        )
        .then((result:ActionStatus)=>{
          let response:CResponse=result.result;
          discuss.id.setId(response.getData()["groupProfileId"]);
          this.listDiscusions.getValue().push(discuss);
          this.setDiscussion(this.listDiscusions.getValue())
          resolve(new ActionStatus());
        })
        .catch((error:ActionStatus)=>reject(error))
      })
    }

    createNewDiscution(discuss:Discussion):Promise<ActionStatus>
    {
        if(discuss.type==DiscussionType.PRIVATE_DISCUSSION) return this.createNewPrivateDiscution(discuss)
        else return this.createNewGroupDiscution(discuss)
    }

    getLocalDiscutionById(idDiscussion: EntityID): Discussion {
        return this.listDiscusions.getValue().find((discuss: Discussion) => discuss.id.toString() == idDiscussion.toString());
    }

    getUnReadDiscussion(): Observable<Discussion>{
        return this.listDiscusions.pipe(
            switchMap((disc:Discussion[])=>from(disc)),
            filter((disc:Discussion)=>disc.read==ChatReadState.UNREAD),
        )
    }

    getUnreadMessage() {

    }

    markAsRead(idMessage: String, idDiscussion: String): Promise<any> {
        return new Promise((resolve, reject) => {

        });
    }

    newMessage(msg: Message, discussID: EntityID): Promise<any> {
        this.listDiscusions.getValue().find((discuss:Discussion)=>discuss.id.toString()==discussID.toString()).chats.push(msg)
        console.log(this.listDiscusions.getValue())
        this.listDiscusions.next(this.listDiscusions.getValue());
        return new Promise((resolve, reject) => {

        });
    }
}
