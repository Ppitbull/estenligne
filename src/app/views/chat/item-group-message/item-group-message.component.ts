import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { EntityID } from 'src/app/shared/entities/entityid';
import { User } from 'src/app/shared/entities/user';
import { MessageContentType, DiscussionType } from 'src/app/shared/enum/chat.enum';
import { ChatService } from 'src/app/shared/services/chat/chat.service';

@Component({
  selector: 'app-item-group-message',
  templateUrl: './item-group-message.component.html',
  styleUrls: ['./item-group-message.component.scss']
})
export class ItemGroupMessageComponent implements OnInit {
  @Input() idDiscuss:EntityID;
  img: String="";
  nameGroup:String=""
  @Input() lastMessage: {type:MessageContentType,data:any}={type:MessageContentType.TEXT_MESSAGE,data:""};
  @Input() active:boolean=false;
  @Input() unreadLenght:number=0
  @Output() selected:EventEmitter<EntityID>=new EventEmitter<EntityID>();
  constructor(private chatService:ChatService) { }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("Changes ",changes)
    if(changes.idDiscuss)
    {
      console.log(this.idDiscuss)
      this.img=this.chatService.getLocalDiscutionById(this.idDiscuss).ppurl;
      this.nameGroup=this.chatService.getLocalDiscutionById(this.idDiscuss).groupName
    }
  }

  ngOnInit(): void {
    this.img=this.chatService.getLocalDiscutionById(this.idDiscuss).ppurl;
    this.nameGroup=this.chatService.getLocalDiscutionById(this.idDiscuss).groupName
  }

  selectGroup()
  {
    this.selected.emit(this.idDiscuss);
  }
}
