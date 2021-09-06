import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { CustomFile } from 'src/app/shared/entities/custom-file';
import { EntityID } from 'src/app/shared/entities/entityid';
import { ActionStatus } from '.';
import { FireBaseConstant } from './firebase-constant';
import { FirebaseDataBaseApi } from './FirebaseDatabaseApi';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFile {
  db:any;
  constructor(private firebaseDatabaseApi:FirebaseDataBaseApi) {
    this.db=this.firebaseDatabaseApi.getFirebaseFile().ref();
   }
  uploadFile(repos:string,file:CustomFile):BehaviorSubject<ActionStatus>
  {
    let result:ActionStatus=new ActionStatus();
    result.result=0;

    let subject:BehaviorSubject<ActionStatus>=new BehaviorSubject<ActionStatus>(result);

    let uploadTask=this.db.child(`${repos}/${(new EntityID()).toString()}.${file.getExtention()}`).put(file.data,{
      contentType:file.type
    })
    
    uploadTask.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
      (snapshot)=>
      {
        result.result=Math.trunc((snapshot.bytesTransferred/snapshot.totalBytes) *100);
        switch(snapshot.state)
        {
          case firebase.default.storage.TaskState.PAUSED:
            result.apiCode=ActionStatus.UPLOAD_PAUSED;            
            subject.next(result);
            break;
          case firebase.default.storage.TaskState.RUNNING:
            result.apiCode=ActionStatus.UPLOAD_RUNNING;
            subject.next(result)
            break;
        }
      },
      (error)=>{
        result.apiCode=error.code;
        subject.error(result);
      },
      ()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
          file.link=downloadURL;
          result.apiCode=ActionStatus.SUCCESS;
          result.result=file;
          subject.next(result);
          subject.complete()
        })
      }
    )
    return subject;
  }
  
}

