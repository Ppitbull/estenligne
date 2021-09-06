import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { combineAll } from 'rxjs/operators';
import { Discussion, Message } from '../../../../shared/entity/chat';
import { generateId } from '../../../../shared/entity/entity';
import { Provider } from '../../../../shared/entity/provider';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { ChatRealtimeService } from '../../../../shared/service/back-office/chat-realtime.service';
import { ChatService } from '../../../../shared/service/back-office/chat.service';
import { UserService } from '../../../../shared/service/user/user.service';

declare var $: any;

export interface DiscussionItem
{
  idDiscuss?:String,
  user?:Provider,
  lastMessage?:Message,
  online?:boolean,    
}
export interface DiscussionMessage
{
  from?:Provider,
  to?:Provider,
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
  
  constructor(private chatService:ChatService,
    private userService: UserService,
    private authService:AuthService,
    private chatRTService:ChatRealtimeService) { }


  ngOnInit(): void {

    this.chatRTService.listDiscusionSubject.subscribe((discussions:Discussion[])=>{
      this.discusionList= [];
      this.discusionList = discussions.slice();
      this.userDiscussionList = new Array();
      // console.log("Discussion listjhjh ",this.discusionList)

      this.discusionList.forEach((discuss:Discussion) => {
        let d:DiscussionItem={};
        d.idDiscuss=discuss._id;
        if(discuss.inter1!=this.authService.currentUserSubject.getValue()._id) 
        {
          this.userService.getUserById(discuss.inter1).then((user:Provider)=> {
            d.user=user
            d.lastMessage=discuss.chats[discuss.chats.length-1];
            this.userDiscussionList.push(d); 
          })
        }
        else this.userService.getUserById(discuss.inter2).then((user:Provider)=> {
          d.lastMessage=discuss.chats[discuss.chats.length-1];
          this.userDiscussionList.push(d); 
          d.user=user
        })

        if(this.selectedDiscussion.getValue()!=null && discuss._id==this.selectedDiscussion.getValue()._id) this.selectedUserDiscuss({idDiscuss:discuss._id})
      });
    })
  }

  selectedUserDiscuss(userDiscuss: DiscussionItem): void {
    this.messageToDisplay =[];
    
    let selectedDiscussion:Discussion = this.discusionList.find((disc:Discussion)=>userDiscuss.idDiscuss==disc._id);
    this.selectedDiscussion.next(selectedDiscussion);
    selectedDiscussion.chats.forEach((message:Message)=>{
      Promise.all([this.userService.getUserById(message.from),this.userService.getUserById(message.to)])
      .then((users:Provider[])=>{
        this.messageToDisplay.push({
          from:users[0],
          to:users[1],
          message,
          senderIsAuthUser:users[0].id==this.authService.currentUserSubject.getValue().id
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

    let message:Message = new Message();
    message.content=msg;
    message._id=generateId();
    message.from=this.authService.currentUserSubject.getValue()._id;
    message.date=new Date().toISOString();
    this.selectedDiscussion.subscribe((discuss:Discussion)=>{
      if(discuss.inter1!=this.authService.currentUserSubject.getValue()._id) message.to=discuss.inter1;
      else message.to=discuss.inter2;
    });
    message.idDiscussion = this.selectedDiscussion.getValue()._id;
    //Apres avoir ajouté a la liste de discussion suivante on peut mettre a jour le backend
    console.log("new message ",message);
   this.chatRTService.sendChatMessage(message)
    // doit avoir une procédure si le message est parti ou pas
  }
  showNotification(from, align, colortype, icon, text) {

    $.notify({
      icon: icon,
      message: text
    }, {
      type: colortype,
      timer: 1000,
      placement: {
        from: from,
        align: align
      }
    });
  }

}
