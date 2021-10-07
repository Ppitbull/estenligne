import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-typing-zone',
  templateUrl: './typing-zone.component.html',
  styleUrls: ['./typing-zone.component.css']
})
export class TypingZoneComponent implements OnInit {
  @Output() sendNewMessage:EventEmitter<String>=new EventEmitter<String>();
  form:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form=new FormGroup({
      formInput:new FormControl("",[Validators.required,Validators.minLength(1)])
    })
  }
  sendMessage():void
  {
    // console.log("Input  ",this.form.value)
    if(!this.form.valid) return;
    this.sendNewMessage.emit(this.form.value.formInput);
    this.form.reset();
  }
}
