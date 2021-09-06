/**
 * @description Cette classe est un outils pour acceder a tout api Rest et est basé sur le package
 *  axios (https://www.npmjs.com/package/axios) 
 * @author Cédric Nguendap
 * @created 17/11/2020
 */
import { Http } from "../http";
import { KRequest } from "./krequest";
import { KResponse } from "./kresponse";
import { KError } from "./kerror";
import { ActionStatus } from "../../firebase";

export class RestApi extends Http
{
    sendRequest(request:KRequest):Promise<ActionStatus>
    {
        return new Promise<ActionStatus>((resolve,reject)=>{
            let resultAction:ActionStatus=new ActionStatus();

            // axios(request.toString())
            // .then((response:AxiosResponse)=>{
            //     ActionStatus.result=new KResponse()
            //     .status(response.status)
            //     .data(response.data)
            //     .statusText(response.statusText)
            //     .headers(response.headers);
            //     resolve(ActionStatus)
            // })
            // .catch((error)=>{
            //     let kerror=new KError();
            //     kerror.response=new KResponse()
            //     .status(error.response.status)
            //     .data(error.response.data)
            //     .statusText(error.response.statusText)
            //     .headers(error.response.headers);
            //     ActionStatus.resultCode=ActionStatus.UNKNOW_ERROR;
                
            //     reject(ActionStatus)
            // })
        });
    }
}