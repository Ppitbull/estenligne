import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTypeNumberComponent } from './input-type-number.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';



@NgModule({
  declarations: [
    InputTypeNumberComponent
  ],
  imports: [
    CommonModule,
    NgxIntlTelInputModule
  ],
  exports:[
    InputTypeNumberComponent
  ]
})
export class InputTypeNumberModule { }
