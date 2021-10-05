import { ChatReadState, DiscussionType, MessageContentType, MessageSendState} from "../enum/chat.enum";
import { Entity } from "./entity";
import { EntityID } from "./entityid";
import { User } from "./user";

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
    messageSendState:MessageSendState=MessageSendState.TRYING_SENDING;
    idDiscussion:EntityID=new EntityID()

    hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            else if(key=="from") this.from.setId(entity[key]);
            else if(key=="to") this.to.setId(entity[key]);
            else if(key=="idDiscussion") this.idDiscussion.setId(entity[key]);
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
            if(k=="idDiscussion") r[k]=this.idDiscussion.toString();
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }


}

export class Discussion extends Entity
{
    userMembers:EntityID[]=[]
    name:string=""
    chats:Message[]=[];
    read:ChatReadState=ChatReadState.UNREAD;
    type:DiscussionType=DiscussionType.PRIVATE_DISCUSSION;
    ppurl:String="assets/img/img_group.png";
    about="";
    createdDate:String=""

    toString()
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="userMembers") r[k]=this.userMembers.map((user)=>user.toString())
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
            if(key=="userMembers") this.userMembers=entity[key].map((userObj)=>{
                let user:EntityID=new EntityID()
                user.setId(userObj);
                return user;
            })

            else if(key=="chats") this.chats=entity[key].map((chat:Record<string,any>)=> {
                    let m:Message=new Message();
                    m.hydrate(chat);
                    return m;
                })
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }
}

export class GroupDiscussion extends Discussion
{
    type:DiscussionType=DiscussionType.GROUP_DISCUSSION;
}
