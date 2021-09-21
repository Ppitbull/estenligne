import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Discussion, Message } from '../../entities/chat';
import { EntityID } from '../../entities/entityid';
import { ChatReadState, MessageContentType } from '../../enum/chat.enum';
import { EventService } from '../../utils/services/events/event.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    listDiscusions: BehaviorSubject<Discussion[]> = new BehaviorSubject<Discussion[]>([]);

    constructor(
        private eventService:EventService,
        ) 
    {
        let discussList=[];
        let d1=new Discussion();

        let md1=new Message();
        md1.content={type:MessageContentType.TEXT_MESSAGE,data:"Bonjour Cédric"};
        md1.from.setId(0);
        md1.to.setId(1);
        md1.date="02/21/2021"

        d1.read=ChatReadState.READ;
        d1.userMembers.push(new EntityID(),new EntityID())
        d1.userMembers[0].setId(0);
        d1.userMembers[1].setId(1);
        d1.chats.push(md1)

        discussList.push(d1)

        this.listDiscusions.next(discussList)
    }

    getDiscutionList(): Promise<any> {
        return new Promise((resolve, reject) => {
            // this.api.get('chat/list', this.headers)
            //     .subscribe((success) => {
            //         if (success && success.resultCode == 0) {
            //             success.result.forEach((disc) => this.listDiscusion.push(Discussion.hydrate(disc)));
            //             resolve(true);
            //         }
            //         else  reject(success);
            //     }, (error: any) => reject(error));
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

    newMessage(msg: Message, discussID: String): Promise<any> {
        return new Promise((resolve, reject) => {
            
        });
    }
}
