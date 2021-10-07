import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { Discussion, Message } from 'src/app/shared/entities/chat';
import { EntityID } from 'src/app/shared/entities/entityid';
import { User } from 'src/app/shared/entities/user';
import { DiscussionType, MessageSendState } from 'src/app/shared/enum/chat.enum';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';
import { AddGroupComponent } from '../add-group/add-group.component';

export interface DiscussionItem
{
  idDiscuss?:EntityID,
  user?:User,
  lastMessage?:Message,
  online?:boolean,
  unreadLenght?:number,
  type?:DiscussionType
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
  selectedDiscussionValueItem:DiscussionItem=null;
  hasSelectedDiscuss:boolean=false;
  messageToDisplay:DiscussionMessage[]=[];

  constructor(
    private chatService:ChatService,
    private userService: UserService,
    private userProfilService:UserProfilService,
    private modalService:BsModalService
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
        d.type=discuss.type
        d.lastMessage=new Message();
        d.user=new User()
        if(discuss.type==DiscussionType.PRIVATE_DISCUSSION)
        {
          if(discuss.userMembers[0].toString()!=this.userProfilService.currentUser.getValue().id.toString())
          {
            this.userService.getUserById(discuss.userMembers[0]).then((result:ActionStatus)=> {
              d.user=result.result
              d.unreadLenght=this.chatService.getNumberOfUnReadMessageByIdDiscuss(discuss.id)
              this.userDiscussionList.push(d);
              if(this.selectedDiscussion.getValue()!=null
                && discuss.id.toString()==this.selectedDiscussion.getValue().id.toString()) this.selectedUserDiscuss(d)
            })
          }
          else this.userService.getUserById(discuss.userMembers[1]).then((result:ActionStatus)=> {
            d.lastMessage=discuss.chats[discuss.chats.length-1];
            d.user=result.result
            this.userDiscussionList.push(d);
            if(this.selectedDiscussion.getValue()!=null
              && discuss.id.toString()==this.selectedDiscussion.getValue().id.toString()) this.selectedUserDiscuss(d)
          })

        }
        else
        {
          this.userDiscussionList.push(d)
        }
      });
    })
  }

  selectedUserDiscuss(userDiscuss: DiscussionItem): void {
    this.messageToDisplay =[];
    let selectedDiscussion:Discussion = this.discusionList.find((disc:Discussion)=>userDiscuss.idDiscuss.toString()==disc.id.toString());
    this.selectedDiscussion.next(selectedDiscussion);
    console.log("Selected Discuss ",selectedDiscussion)
    selectedDiscussion.chats.forEach((message:Message)=>{
      console.log("Message ",message )
      this.userService.getUserById(message.from)
      .then((results:ActionStatus)=>{
        this.messageToDisplay.push({
          from:results.result,
          message,
          senderIsAuthUser:results.result.id.toString()==this.userProfilService.currentUser.getValue().id.toString()
        })
      })
    })
    this.hasSelectedDiscuss=true;
    this.selectedDiscussionValueItem=userDiscuss
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
    message.content.data=msg.toString();
    message.from.setId(this.userProfilService.currentUser.getValue().id.toString());
    message.date=new Date().toISOString();
    message.messageSendState=MessageSendState.TRYING_SENDING;
    console.log("Message ",message.from)
    if(this.selectedDiscussion.getValue().type==DiscussionType.PRIVATE_DISCUSSION)
    {
      let discuss=this.selectedDiscussion.getValue();
      if(discuss.userMembers[0].toString()!=this.userProfilService.currentUser.getValue().id.toString()) message.to.setId(discuss.userMembers[0].toString());
      else message.to.setId(discuss.userMembers[1].toString());
    }
    message.idDiscussion.setId(this.selectedDiscussion.getValue().id.toString());
    this.chatService.newMessage(message,message.idDiscussion)
    console.log("new message ",message);
  }

  newGroupUI()
  {
    this.modalService.show(AddGroupComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true
      })
  }
  settingUI()
  {

  }

  logout()
  {

  }
}
