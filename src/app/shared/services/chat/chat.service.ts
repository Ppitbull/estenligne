import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Discussion, Message } from '../../entities/chat';
import { EntityID } from '../../entities/entityid';
import { ChatReadState } from '../../enum/chat.enum';
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
