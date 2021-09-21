import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { DiscussionItem } from '../chat/chat.component';
import { EntityID } from 'src/app/shared/entities/entityid';
import { User } from 'src/app/shared/entities/user';

@Component({
  selector: 'app-list-user-message',
  templateUrl: './list-user-message.component.html',
  styleUrls: ['./list-user-message.component.css'],
})
export class ListUserMessageComponent implements OnInit{
  @Input() listUser:DiscussionItem[]=[];
  selectedDiscussId:EntityID=new EntityID();
  selectedDiscussionId:EntityID=new EntityID();

  @Output() selectUserEvent:EventEmitter<DiscussionItem>=new EventEmitter<DiscussionItem>();
  constructor() { }

  ngOnInit(): void {
    // console.log("listUSer ", this.listUser)
    if(this.listUser.length> 0){      
      this.selectedDiscussId.setId(this.listUser[0].idDiscuss.toString()) ;
      // console.log("selected",this.selectedUser )
    }
  }

  selectUser(idDisc:EntityID)
  {
    let discuss = this.listUser.find((disc:DiscussionItem)=> idDisc.toString()==disc.idDiscuss.toString());
    this.selectedDiscussionId=idDisc;
    this.selectUserEvent.emit(discuss);
  }

  shouldActive(user)
  {
    // console.log("active ",this.selectedUser.id,user.user.id)
    return this.selectedDiscussionId==user.idDiscuss
  }

}
