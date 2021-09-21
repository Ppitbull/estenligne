import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserProfilComponent } from './views/auth/create-user-profil/create-user-profil.component';
import { LoadUserDatasComponent } from './views/auth/load-user-datas/load-user-datas.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';

const routes: Routes = [
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"create-profil",
    component:CreateUserProfilComponent
  },
  {
    path:"load-data",
    component:LoadUserDatasComponent
  },
  {
    path:"chat",
    loadChildren:()=>import('./views/chat/chat.module').then((chat)=>chat.ChatModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
