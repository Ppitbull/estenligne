import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-loader',
  templateUrl: './simple-loader.component.html',
  styleUrls: ['./simple-loader.component.scss']
})
export class SimpleLoaderComponent implements OnInit {

  @Input() text:string="";
  constructor() { }

  ngOnInit(): void {
  }

}
