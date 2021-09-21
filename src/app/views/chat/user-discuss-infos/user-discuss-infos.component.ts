import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Discussion } from 'src/app/shared/entities/chat';
import { DiscussionType } from 'src/app/shared/enum/chat.enum';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';
import { DiscussionItem } from '../chat/chat.component';

@Component({
  selector: 'app-user-discuss-infos',
  templateUrl: './user-discuss-infos.component.html',
  styleUrls: ['./user-discuss-infos.component.scss']
})
export class UserDiscussInfosComponent implements OnInit,OnChanges {

  @Input() selectedDiscuss:DiscussionItem
  imgSrc:String="";
  discName:String="";
  detail:String="";
  constructor(private chatService:ChatService,private userService:UserService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes,this.selectedDiscuss)
    if(this.selectedDiscuss.type==DiscussionType.GROUP_DISCUSSION)
    {
      this.imgSrc=this.chatService.getLocalDiscutionById(this.selectedDiscuss.idDiscuss).ppurl;
      this.discName=this.chatService.getLocalDiscutionById(this.selectedDiscuss.idDiscuss).name
      Promise.all(this.chatService.getLocalDiscutionById(this.selectedDiscuss.idDiscuss).userMembers.map((userID)=>this.userService.getUserById(userID)))
      .then((value:ActionStatus[])=>{
        this.detail=value.map((action)=>action.result.getPrintableIdentity()).reduce((acc:String,currValue:String)=>`${currValue}, ${acc}`,[])
      })
    }
    else 
    {
      this.imgSrc=this.selectedDiscuss.user.photoUrl;
      this.discName=this.selectedDiscuss.user.getFullName()
            
    }
  }

  ngOnInit(): void {

  }


}
