import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTypeNumberModule } from './components/input-type-number/input-type-number.module';
import { SimpleLoaderComponent } from './components/loader/simple-loader/simple-loader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SelectUserComponent } from './components/select-user/select-user.component';



@NgModule({
  declarations: [
    SimpleLoaderComponent,
  ],
  imports: [
    CommonModule,
    InputTypeNumberModule,
    MatProgressBarModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[
    InputTypeNumberModule,
    SimpleLoaderComponent,
    HttpClientModule
  ],
})
export class SharedModule { }
