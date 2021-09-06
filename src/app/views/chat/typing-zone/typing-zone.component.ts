import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-typing-zone',
  templateUrl: './typing-zone.component.html',
  styleUrls: ['./typing-zone.component.css']
})
export class TypingZoneComponent implements OnInit {
  @Output() sendNewMessage:EventEmitter<String>=new EventEmitter<String>();
  formInput:FormControl=new FormControl("",[Validators.required,Validators.minLength(1)]);
  constructor() { }

  ngOnInit(): void {
  }
  sendMessage():void
  {
    // console.log("Input  ",this.formInput.value)
    if(!this.formInput.valid) return;
    this.sendNewMessage.emit(this.formInput.value);
    this.formInput.setValue("");
  }
}
