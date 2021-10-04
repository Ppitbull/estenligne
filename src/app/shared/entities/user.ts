import { Entity } from "./entity";


export class User extends Entity
{
    nom:String="";
    prenom:String="";
    sexe:String="";
    email:String="";
    photoUrl:String="assets/img/user.png";
    password:String="";
    phoneNumber:String="";
    dateCreated:String="";
    dateNaiss:String="";
    lieuxNaiss:String="";
    villeResidenceActuelle:String="";
    nationalite:String="";
    rememberMe:boolean=false;
    about:String=""
    identity:String="";
    availability:number=0;
    dateDeleted:String=""


    getIdentity()
    {
      if(this.identity=="") return this.phoneNumber==""?this.email:this.phoneNumber
      return this.identity
    }

    getPrintableName()
    {
        return this.prenom.length>0?this.prenom:this.nom
    }
    getFullName()
    {
        return `${this.prenom} ${this.nom}`
    }

    getPrintableIdentity()
    {
        return this.getPrintableName().length>0?this.getPrintableName():(this.email.length>0?this.email:this.phoneNumber)
    }

}
