import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Entity } from 'src/app/shared/entities/entity';
import { EntityID } from 'src/app/shared/entities/entityid';
import { User } from 'src/app/shared/entities/user';
import { DiscussionType, MessageContentType } from 'src/app/shared/enum/chat.enum';
import { ChatService } from 'src/app/shared/services/chat/chat.service';


@Component({
  selector: 'app-item-user-message',
  templateUrl: './item-user-message.component.html',
  styleUrls: ['./item-user-message.component.css']
})
export class ItemUserMessageComponent implements OnInit,OnChanges {
  @Input() idDiscuss:EntityID;
  img: String="";
  @Input() user:User=new User();
  @Input() online:boolean=false;
  @Input() lastMessage: {type:MessageContentType,data:any}={type:MessageContentType.TEXT_MESSAGE,data:""};
  @Input() active:boolean=false;
  @Input() unreadLenght:number=0
  @Output() selected:EventEmitter<EntityID>=new EventEmitter<EntityID>();
  constructor(private chatService:ChatService) { }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("Changes ",changes)
  }

  ngOnInit(): void {
    this.img=this.chatService.getLocalDiscutionById(this.idDiscuss).type==DiscussionType.GROUP_DISCUSSION?this.chatService.getLocalDiscutionById(this.idDiscuss).ppurl:this.user.photoUrl;
  }

  selectUser()
  {
    this.selected.emit(this.idDiscuss);
  }
}
