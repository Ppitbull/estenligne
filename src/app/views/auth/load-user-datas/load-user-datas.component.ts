import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { LoaderDataService } from 'src/app/shared/services/loader-data/loader-data.service';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

@Component({
  selector: 'app-load-user-datas',
  templateUrl: './load-user-datas.component.html',
  styleUrls: ['./load-user-datas.component.scss']
})
export class LoadUserDatasComponent implements OnInit {

  loadText:String="Wait a moment..."
  constructor(
    private loaderDataService:LoaderDataService,
    private loginService:LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.registerPlateform()
    .then((result:ActionStatus)=>{
      let data=result.result;
      console.log("Data ",data)
      return this.loaderDataService.fcmRegistration(data["id"],data["pushNotificationToken"])
    })
    .then(()=>{
      this.loadText="Download user data..."
    })
    .catch((error)=>{

    })
  }

}
