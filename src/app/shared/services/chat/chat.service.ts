import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Discussion, Message } from '../../entities/chat';
import { EntityID } from '../../entities/entityid';
import { ChatReadState, MessageContentType } from '../../enum/chat.enum';
import { EventService } from '../../utils/services/events/event.service';
import { ActionStatus } from '../../utils/services/firebase';
import { CRequest } from '../../utils/services/http/client/crequest';
import { CResponse } from '../../utils/services/http/client/cresponse';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { UserProfilService } from '../user-profil/user-profil.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    listDiscusions: BehaviorSubject<Discussion[]> = new BehaviorSubject<Discussion[]>([]);

    constructor(
        private eventService:EventService,
        private restApiService:RestApiClientService,
        private userProfilService:UserProfilService
        )
    {
        let discussList=[];

        this.listDiscusions.next(discussList)
    }

    getAllDiscutionList(): Promise<ActionStatus> {
        return new Promise<ActionStatus>((resolve, reject) => {
            this.restApiService.sendRequest(
              new CRequest()
              .get()
              .url(`chatroom/getall?${this.userProfilService.currentUser.getValue().id.toString()}`)
              .header("Authorization",`Bearer ${this.restApiService.headerKey.getValue().get("token")}`)
            )
            .then((result:ActionStatus)=>
            {
              let response:CResponse=result.result;
              console.log("Chat room data",response.getData())
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
