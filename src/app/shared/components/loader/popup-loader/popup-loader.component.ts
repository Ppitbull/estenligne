import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-popup-loader',
  templateUrl: './popup-loader.component.html',
  styleUrls: ['./popup-loader.component.scss']
})
export class PopupLoaderComponent implements OnInit, OnChanges {

  @Input() text:string="";
  @Input() show:boolean=false;

  @ViewChild("template") modalTemplate:TemplateRef<any>;

  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private modalService:BsModalService
  ) { }
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes.show)
    {
      if(this.show) this.modalService.show(this.modalTemplate,this.config)
      else this.modalService.hide(1); 
    }   
  }
  

}
