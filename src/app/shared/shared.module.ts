import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTypeNumberModule } from './components/input-type-number/input-type-number.module';
import { SimpleLoaderComponent } from './components/loader/simple-loader/simple-loader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    SimpleLoaderComponent
  ],
  imports: [
    CommonModule,
    InputTypeNumberModule,
    MatProgressBarModule,
    HttpClientModule
  ],
  exports:[
    InputTypeNumberModule,
    SimpleLoaderComponent,
    HttpClientModule
  ],
})
export class SharedModule { }
