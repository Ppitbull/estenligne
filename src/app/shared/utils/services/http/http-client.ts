
import { ActionStatus } from "../firebase";
import { CRequest } from "./client/crequest";

/**
 * @description Cette classe represente la classe de base de tout client et serveur HTTP 
 * @author Cédric Nguendap
 * @created 17/11/2020
 */
export abstract class HttpClient
{
    abstract sendRequest(request:CRequest):Promise<ActionStatus>
}