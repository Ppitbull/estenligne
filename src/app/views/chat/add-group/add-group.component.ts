import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Discussion, GroupDiscussion } from 'src/app/shared/entities/chat';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

declare var Choices:any

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  submitedForm=false;
  waitResponse=false;
  groupForm:FormGroup;
  constructor(
    private modalService:BsModalService,
    private host:ElementRef,
    private userProfilService:UserProfilService,
    private chatService:ChatService
  ) { }

  ngOnInit(): void {
    this.groupForm=new FormGroup({
      groupName:new FormControl("",[Validators.required]),
      groupAbout:new FormControl("")
    })
  }

  close()
  {
    this.modalService.hide()
  }

  createGroup()
  {
    this.submitedForm=true;
    if(!this.groupForm.valid) return;
    this.waitResponse=true;
    let group:GroupDiscussion=new GroupDiscussion();
    group.userMembers.push(this.userProfilService.currentUser.getValue().id)
    group.about=this.groupForm.value.groupAbout;
    group.name=this.groupForm.value.groupName
    group.createdDate=(new Date()).toISOString();
    this.chatService.createNewDiscution(group)
    this.chatService.createNewDiscution(group)
    .then((result:ActionStatus)=>{
      this.close();
    })
    .catch((error:ActionStatus)=>{
      this.close();
    })

  }


}
