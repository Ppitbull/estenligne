/**
@author: Cedric nguendap
@description: Cette classe permet de générer un identifiant unique néccessaire pour la persistance
@see Mongoose.ObjectID
@created: 09/10/2020
*/
export class EntityID
{
    private _id:Number;
    constructor()
    {
        this._id=this.generateId();
    }
    /**
     * @description cette methode permet de générer un identifiant unique a 16 caractéres
     * @return une chaine de carractére de 16 éléments 
     */
    private generateId():Number
    {
        // var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        // return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        //     return (Math.random() * 16 | 0).toString(16);
        // }).toLowerCase();
        return 0;
    }
    
    setId(id:Number)
    {
        this._id=id;
    }

    toString():Number
    {
        return this._id;
    }
    toObject():any
    {
        return this._id;
    }
}   