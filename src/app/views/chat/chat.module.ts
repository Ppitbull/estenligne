import { NgModule } from '@angular/core';

import { ChatComponent } from './chat/chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ReceivedMessageComponent } from './received-message/received-message.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { TypingZoneComponent } from './typing-zone/typing-zone.component';
import { ListUserMessageComponent } from './list-user-message/list-user-message.component';
import { ItemUserMessageComponent } from './item-user-message/item-user-message.component';
import { CommonModule } from '@angular/common';
import { DisplayMessagesComponent } from './display-messages/display-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDiscussInfosComponent } from './user-discuss-infos/user-discuss-infos.component';
import { SearchUserBarComponent } from './search-user-bar/search-user-bar.component';
import { InfosChatAppComponent } from './infos-chat-app/infos-chat-app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatRoutingModule,
    RouterModule
  ],
  declarations: [ 
    ChatComponent, 
    ReceivedMessageComponent,
    SendMessageComponent, 
    TypingZoneComponent, 
    ListUserMessageComponent, 
    ItemUserMessageComponent, 
    DisplayMessagesComponent, UserDiscussInfosComponent, SearchUserBarComponent, InfosChatAppComponent 
  ]
})
export class ChatModule { }
