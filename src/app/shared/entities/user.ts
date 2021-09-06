import { Entity } from "./entity";


export class User extends Entity
{
    nom:String="";
    prenom:String="";
    sexe:String="";
    email:String="";
    photoUrl:String="";
    mdp:String="";
    tel:String="";
    dateCreation:String="";
    dateNaiss:String="";
    lieuxNaiss:String="";
    villeResidenceActuelle:String="";
    nationalite:String="";

    getPrintableName()
    {
        return this.prenom.length>0?this.prenom:this.nom
    }
    getFullName()
    {
        return `${this.prenom} ${this.nom}`
    }

}
