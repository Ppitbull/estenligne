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

@Injectable({
    providedIn:"root"
})
export class RestApiClientService extends CustomHttpClient
{
    apiUrl="https://estenligne.com:44364/api"
    constructor(private http:HttpClient){
        super();
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
                    params:request.getParam()
                }
           )
           .subscribe((response:HttpResponse<Object>)=>{
               console.log("Response ",response)
                let r=new CResponse();
                r.data(response.body)
                .status(response.status)
                .statusText(response.statusText)
                // response.headers.keys().forEach((currentValue)=> r.header(currentValue,response.headers.get(currentValue)))
                actionResult.apiCode=ActionStatus.SUCCESS;
                actionResult.message=response.statusText;
                actionResult.result=r;
                resolve(actionResult);
            },
            (error:HttpErrorResponse)=>{
                console.log("ResponseError ",error)
                console.log("Error interne ",error.error)
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