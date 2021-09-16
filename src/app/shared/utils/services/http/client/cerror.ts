
import { Entity } from "src/app/shared/entities/entity";
import { CRequest } from "./crequest";
import { CResponse } from "./cresponse";

export class CError extends Entity
{
    
    request:CRequest=new CRequest();
    response:CResponse=new CResponse();
    message:String="";

    
    toString() 
    {
        return {
           
        }
    }

   
    hydrate(entity: Entity): void {
        throw new Error("Method not implemented.");
    }
}
