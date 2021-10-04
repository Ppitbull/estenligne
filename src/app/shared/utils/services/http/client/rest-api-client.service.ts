/**
 * @description Cette classe est un outils pour acceder a tout api Rest et est basé sur le package
 *  axios (https://www.npmjs.com/package/axios)
 * @author Cédric Nguendap
 * @created 17/11/2020
 */
import { HttpClient as CustomHttpClient } from "../http-client";
import { CRequest } from "./crequest";
import { CResponse } from "./cresponse";
import { CError } from "./cerror";
import { Injectable } from "@angular/core";
import { ActionStatus } from "../../firebase";

import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LocalStorageService } from "src/app/shared/services/localstorage/localstorage.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class RestApiClientService extends CustomHttpClient
{
    apiUrl="https://estenligne.com:44364/api"

    headerKey:BehaviorSubject<Map<String,any>>=new BehaviorSubject<Map<String,any>>(new Map());

    constructor(private http:HttpClient,
        private localStorageService:LocalStorageService){
        super();
        this.localStorageService.getSubjectByKey("data_resp_api").subscribe((value)=>{
            if(!value) return;
            let newMap:Map<String,any>=new Map();
            value.forEach(element => {
                newMap.set(element.key,element.value);
            });
            this.headerKey.next(newMap);
        })
    }

    setHeaderToStorage(key:String,value:any)
    {
        this.headerKey.getValue().set(key,value);
        this.localStorageService.setData("data_resp_api",
        Array.from(this.headerKey.getValue().keys()).map((key)=>{
            return {
                key,
                value:this.headerKey.getValue().get(key)
            }
        })  )
    }
    sendRequest(request:CRequest):Promise<ActionStatus>
    {
        return new Promise<ActionStatus>((resolve,reject)=>{
            let actionResult=new ActionStatus();
            let r=request.toString();
            console.log("body ",request.getData())
            this.http.request(
                r.method,
                `${this.apiUrl}/${r.url}`,
                {
                    body:request.getData(),
                    headers:r.headers,
                    params:request.getParam(),
                    observe:'response'
                }
           )
           .subscribe((response)=>{
               console.log("Response ",response)
                let r=new CResponse();
                r.data(response.body)
                .status(response.status)
                .statusText(response.statusText)
                response.headers.keys().forEach((currentValue)=> r.header(currentValue,response.headers.get(currentValue)))
                actionResult.apiCode=ActionStatus.SUCCESS;
                actionResult.message=response.statusText;
                actionResult.result=r;
                resolve(actionResult);
            },
            (error:HttpErrorResponse)=>{
                console.log("Error interne ",error)
                let r=new CError();
                r.message=error.error instanceof ErrorEvent ? error.error.message: error.error
                r.response.status(error.status)
                .statusText(error.statusText)
                error.headers.keys().forEach((currentValue)=> r.response.header(currentValue,error.headers.get(currentValue)))
                actionResult.apiCode=ActionStatus.UNKNOW_ERROR;
                // actionResult.message=r.message.toString();
                actionResult.result=r;
                reject(actionResult);
            })
        });
    }
}
