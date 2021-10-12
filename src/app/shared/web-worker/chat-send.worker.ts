/// <reference lib="webworker" />

import { Message } from "../entities/chat";
import { MessageContentType } from "../enum/chat.enum";
import { ActionStatus } from "../utils/services/firebase";
import { CError } from "../utils/services/http/client/cerror";
import { CRequest } from "../utils/services/http/client/crequest";
import { CResponse } from "../utils/services/http/client/cresponse";

enum MessageSendingState
{
  IN_SENDING_STATE,
  IN_WAITING_STATE
}


class ChatSendWorker
{
  fileMessage:{stateTransfert:MessageSendingState,message:Message}[]=[];
  start:boolean=true;
  token:string="";
  apiUrl:string="";

  startSend()
  {
    while (this.start)
    {

      if(this.fileMessage.length>0)
      {
        let stateTransfert,message;

          ({stateTransfert,message}=this.fileMessage.shift())
          if(stateTransfert==MessageSendingState.IN_WAITING_STATE)
          {
            this.sendMessage(message)
            .then((result)=>{
              this.sendMessageToUI(message);
            })
            .catch((error)=>{
              this.fileMessage.push({
                stateTransfert:MessageSendingState.IN_WAITING_STATE,
                message
              })
            })
          }

        }
      }
  }

  newMessage(message:Message)
  {
    this.fileMessage.push({
      stateTransfert:MessageSendingState.IN_WAITING_STATE,
      message
    });
  }

  sendMessageToUI(message)
  {
    postMessage({
      type:"ok",
      data:message
    })
  }

  sendMessage(message:Message):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      let promise:Promise<ActionStatus>;
      if(message.content.type!=MessageContentType.TEXT_MESSAGE && message.content.type!=MessageContentType.HTML_MESSAGE)
      {
        promise=this.sendMessageFile(message)
      }
      else
      {
        let actionStatus=new ActionStatus();
        actionStatus.apiCode=ActionStatus.SUCCESS_END
        promise=Promise.resolve(actionStatus)
      }
      promise.then((result)=>{
        let fileID=-1
        if(result.apiCode!=ActionStatus.SUCCESS_END)
        {
          let response:CResponse=result.result;
          fileID=response.getData()["id"];
        }
        return this.sendMessageText(message,fileID)
      })
      .then((result:ActionStatus)=>{
        resolve(result)
      })
      .catch((error)=>reject(error))
    })
  }
  sendMessageFile(message:Message):Promise<ActionStatus>
  {
    return this.sendRequest(
      new CRequest()
      .post()
      .url(`${this.apiUrl}/file`)
      .header("Authorization",`Bearer ${this.token}`)
      .form()
      .data({
        file:message.content.data
      })
    )
  }

  sendMessageText(message:Message,fileID=-1):Promise<ActionStatus>
  {
    return this.sendRequest(
      new CRequest()
      .post()
      .url(`${this.apiUrl}/message`)
      .header("Authorization",`Bearer ${this.token}`)
      .data({
        id:message.id,
        senderId:message.from.toString(),
        authorId:message.author.toString(),
        fileId:fileID,
        body:"",
        dateSent:(new Date()).toISOString()
      })
    )
  }
  sendRequest(request:CRequest):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      let actionStatus:ActionStatus=new ActionStatus()
      fetch(
        request.url.toString(),
        {
          method:request.toString().method,
          body:request.getData(),
          headers:request.toString().headers
        }
      )
      .then((response:Response)=>{
        if (!response.ok) {
          return Promise.reject(response);
        }
        let r=new CResponse();
        r.data(response.body)
        .status(response.status)
        .statusText(response.statusText)
        response.headers.forEach((currentValue)=> r.header(currentValue,response.headers.get(currentValue)))
        actionStatus.result=r;
        resolve(actionStatus)
      })
      .catch((error)=>{
        let r=new CError();
        r.message=error.error instanceof ErrorEvent ? error.error.message: error.error
        r.response.status(error.status)
        .statusText(error.statusText)
        error.headers.keys().forEach((currentValue)=> r.response.header(currentValue,error.headers.get(currentValue)))
        actionStatus.apiCode=ActionStatus.UNKNOW_ERROR;
        // actionResult.message=r.message.toString();
        actionStatus.result=r;
        reject(error)
      })
    })
  }
}

let chatSendWorker=new ChatSendWorker();


addEventListener('message', ({ data }) => {
  if(data["type"]=="init")
  {
    chatSendWorker.apiUrl=data["data"]["apiUrl"];
    chatSendWorker.token=data["data"]["token"];
    chatSendWorker.startSend();
  }
  else if(data["type"]="send")
  {
    chatSendWorker.newMessage(data["data"])
  }
  // postMessage(response);
});
