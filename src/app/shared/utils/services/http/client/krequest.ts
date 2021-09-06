import { Entity } from "src/app/shared/entities/entity";
import { Method } from "../http-method.type";


export class KRequest extends Entity
{
    hydrate(entity: Record<string | number , any>): void {
        throw new Error("Method not implemented.");
    }    
    headerData:Record<string | number,string>={}; 
    requestType:String="json";
    dataObj:any=null;
    accesstoken:any=null;
    link:String="";
    method:Method='get';

    token(accesstoken:any):KRequest
    {
        this.accesstoken=accesstoken;
        return this;
    }

    get():KRequest
    {
        this.method="get";
        return this;
    }
    post():KRequest
    {
        this.method="post";
        return this;
    }
    put():KRequest
    {
        this.method="put";
        return this;
    }
    delete():KRequest
    {
        this.method="delete";
        return this;
    }
    header(key:string,value:any):KRequest
    {
        this.headerData[key]=value;
        return this;
    }
    data(data:any):KRequest
    {
        this.dataObj=data;
        return this;
    }
    url(link:String):KRequest
    {
        this.link=link;
        return this;
    }
    json():KRequest
    {
        this.headerData['Content-Type']="Content-Type': 'application/json";
        this.requestType="json";
        return this;
    }
    form():KRequest
    {
        this.headerData['Content-Type']="Content-Type': 'multipart/form-data";
        this.requestType="form-data"
        return this;
    }
    text():KRequest
    {
        this.requestType="text";
        return this;
    }
    xml():KRequest
    {
        this.requestType="xml";
        this.headerData['Content-Type']="Content-Type': 'application/xml";
        return this;
    }
    serializeDataToUrl():String
    {
        let endpoint=this.link.toString();
        if (this.dataObj) {
            let req: String = '';
            for (const key in this.dataObj) {
              req += `${key}=${this.dataObj[key]}&`;
            }
            endpoint +="?" + req;
        }
        return endpoint;
    }
    toJSON()
    {
        return JSON.parse(JSON.stringify(this.dataObj));
    }

    toFormData()
    {
        let formData:FormData=new FormData();
        if(this.dataObj.constructor===({}).constructor)
        {
            for(let key in this.dataObj)
            {
                formData.append(key,this.dataObj[key]);
            }
        }
        else if(this.dataObj.constructor===([]).constructor)
        {
            for(let i=0;i<this.dataObj.length;i++)
            {
                formData.append(i.toString(),this.dataObj[i])
            }
        }
        else 
        {
            formData.append("data",this.dataObj);
        }
        return formData;
    }

    toString() 
    {
        let data;
        if(this.requestType=="form-data") data= this.toFormData();
        if(this.requestType=="json") data =this.toJSON();
        return {
            url:this.link.toString(),
            method:this.method,
            headers:this.headerData,
            data,
        }
    }    
}
