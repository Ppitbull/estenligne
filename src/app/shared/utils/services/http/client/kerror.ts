import { KarryngoCore } from "../../decorator/core.decorator";
import { KarryngoApplicationEntity } from "../../KarryngoApplicationEntity";
import { KarryngoEntity } from "../../KarryngoEntity";
import { KRequest } from "./krequest";
import { KResponse } from "./kresponse";


@KarryngoCore()
export class KError extends KarryngoApplicationEntity
{
    
    request:KRequest=new KRequest();
    response:KResponse=new KResponse();
    message:String="";

    
    toString() 
    {
        return {
           
        }
    }

   
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }
}
