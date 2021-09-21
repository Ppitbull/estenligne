import { AfterViewInit, Component, } from '@angular/core';
import { LocalStorageService } from './shared/services/localstorage/localstorage.service';

declare var feather:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'EstEnLigne';

  constructor(private localStorageServce:LocalStorageService){}
  ngAfterViewInit(): void {

  }
}
