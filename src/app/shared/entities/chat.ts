import { ChatReadState, MessageContentType } from "../enum/chat.enum";
import { Entity } from "./entity";
import { EntityID } from "./entityid";

export interface MessageContent
{
    type:MessageContentType,
    mimeType?:string;
    data:string
}


export class Message extends Entity
{
    from:EntityID=new EntityID();
    to:EntityID=new EntityID();
    date:String="";
    title:String="";
    content:MessageContent={type:MessageContentType.TEXT_MESSAGE,data:""};
    read:ChatReadState=ChatReadState.UNREAD;

    hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            else if(key=="from") this.from.setId(entity[key]);
            else if(key=="to") this.to.setId(entity[key]);
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="id") r[k]=this.id.toString();
            if(k=="from") r[k]=this.from.toString();
            if(k=="to") r[k]=this.to.toString();
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }

   
}

export class Discussion extends Entity
{
    user1:EntityID=new EntityID();
    user2:EntityID= new EntityID();
    chats:Message[]=[];
    read:ChatReadState=ChatReadState.UNREAD;

    toString()
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="user1") r[k]=this.user1.toString();
            if(k=="user2") r[k]=this.user2.toString();
            if(k=="chats") r[k]=this.chats.map((msg)=>msg.toString());
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
    hydrate(entity: any)
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            else if(key=="user1") this.user1.setId(entity[key]);
            else if(key=="user2") this.user2.setId(entity[key]);
            else if(key=="chats") this.chats=entity[key].map((chat:Record<string,any>)=> {
                    let m:Message=new Message();
                    m.hydrate(chat);
                    return m;
                })
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }       
    }


}