
import { ActionStatus } from "../firebase";
import { KRequest } from "./client/krequest";

/**
 * @description Cette classe represente la classe de base de tout client et serveur HTTP 
 * @author Cédric Nguendap
 * @created 17/11/2020
 */
export abstract class Http
{
    abstract sendRequest(request:KRequest):Promise<ActionStatus>
}