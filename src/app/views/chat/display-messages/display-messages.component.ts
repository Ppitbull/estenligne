import { Component, OnInit, Input } from '@angular/core';
import { DiscussionMessage } from '../chat/chat.component';

@Component({
  selector: 'app-display-messages',
  templateUrl: './display-messages.component.html',
  styleUrls: ['./display-messages.component.css']
})
export class DisplayMessagesComponent implements OnInit {

  @Input() discussFils:DiscussionMessage[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
