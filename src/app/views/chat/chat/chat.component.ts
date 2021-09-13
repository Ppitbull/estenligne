import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { combineAll } from 'rxjs/operators';
import { Discussion, Message } from 'src/app/shared/entities/chat';
import { EntityID } from 'src/app/shared/entities/entityid';
import { User } from 'src/app/shared/entities/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

export interface DiscussionItem
{
  idDiscuss?:EntityID,
  user?:User,
  lastMessage?:Message,
  online?:boolean,    
}
export interface DiscussionMessage
{
  from?:User,
  to?:User,
  senderIsAuthUser?:boolean,
  message?:Message 
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  discusionList:Discussion[]=[];
  userDiscussionList:DiscussionItem[]=[];
  selectedDiscussion:BehaviorSubject<Discussion>=new BehaviorSubject<Discussion>(null);
  messageToDisplay:DiscussionMessage[]=[];
  
  constructor(
    private chatService:ChatService,
    private userService: UserService,
    private userProfilService:UserProfilService
    ) { }


  ngOnInit(): void {

    this.chatService.listDiscusions.subscribe((discussions:Discussion[])=>{
      this.discusionList= [];
      this.discusionList = discussions.slice();
      this.userDiscussionList = new Array();
      // console.log("Discussion listjhjh ",this.discusionList)

      this.discusionList.forEach((discuss:Discussion) => {
        let d:DiscussionItem={};
        d.idDiscuss=discuss.id;
        if(discuss.user1.toString()!=this.userProfilService.currentUser.getValue().id.toString()) 
        {
          this.userService.getUserById(discuss.user1).then((result:ActionStatus)=> {
            d.user=result.result
            d.lastMessage=discuss.chats[discuss.chats.length-1];
            this.userDiscussionList.push(d); 
          })
        }
        else this.userService.getUserById(discuss.user2).then((result:ActionStatus)=> {
          d.lastMessage=discuss.chats[discuss.chats.length-1];
          this.userDiscussionList.push(d); 
          d.user=result.result
        })

        if(this.selectedDiscussion.getValue()!=null && discuss.id.toString()==this.selectedDiscussion.getValue().id.toString()) this.selectedUserDiscuss({idDiscuss:discuss.id})
      });
    })
  }

  selectedUserDiscuss(userDiscuss: DiscussionItem): void {
    this.messageToDisplay =[];
    
    let selectedDiscussion:Discussion = this.discusionList.find((disc:Discussion)=>userDiscuss.idDiscuss.toString()==disc.id.toString());
    this.selectedDiscussion.next(selectedDiscussion);
    selectedDiscussion.chats.forEach((message:Message)=>{
      Promise.all([this.userService.getUserById(message.from),this.userService.getUserById(message.to)])
      .then((results:ActionStatus[])=>{
        this.messageToDisplay.push({
          from:results[0].result,
          to:results[1].result,
          message,
          senderIsAuthUser:results[0].result.id.toString()==this.userProfilService.currentUser.getValue().id.toString()
        })
      })
    })
  }
  newMessage(msg:String):void
  {
    /**
     * from:String=new String();
    to:String=new String();
    date:String="";
    title:String="";
    content:String="";
    read:number=0;
    idDiscussion:String="";
     */
    if(this.selectedDiscussion.getValue()==null) return;

  //   let message:Message = new Message();
  //   message.content=msg;
  //   message._id=generateId();
  //   message.from=this.authService.currentUserSubject.getValue()._id;
  //   message.date=new Date().toISOString();
  //   this.selectedDiscussion.subscribe((discuss:Discussion)=>{
  //     if(discuss.inter1!=this.authService.currentUserSubject.getValue()._id) message.to=discuss.inter1;
  //     else message.to=discuss.inter2;
  //   });
  //   message.idDiscussion = this.selectedDiscussion.getValue()._id;
  //   //Apres avoir ajouté a la liste de discussion suivante on peut mettre a jour le backend
  //   console.log("new message ",message);
  //  this.chatRTService.sendChatMessage(message)
    // doit avoir une procédure si le message est parti ou pas
  }



}
