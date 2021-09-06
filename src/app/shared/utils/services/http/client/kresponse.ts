import { Entity } from "src/app/shared/entities/entity";


export class KResponse extends Entity
{
    
    private _header:Record<string | number,string>={}; 
    private _status:number=200;
    private _statusText:String='OK';
    private _config:Record<string | number,string>={};
    private _data:any={};
    private _request:Record<string | number,string>={}; 

    
    header(key:string,value:any):KResponse
    {
        this._header[key]=value;
        return this;
    }
    headers(headers:Record<string | number,string>={}):KResponse
    {
        this._header={...this._header,...headers}
        return this;
    }
    data(data:any):KResponse
    {
        this._data=data;
        return this;
    }
    status(status:number):KResponse
    {
        this._status=status;
        return this;
    }
    statusText(statusText:String):KResponse
    {
        this._statusText=statusText
        return this;
    }
    config(conf:Record<string | number,string>={}):KResponse
    {
        this._config=conf;
        return this;
    }
   
    toString() 
    {
        return {
           config:this._config,
           header:this._header,
            status:this._status,
            data:this._data
        }
    }

    hydrate(entity: Record<number | string , any>): void {
        
    }

    getData():any
    {
        return this._data
    }
}
