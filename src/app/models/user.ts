export class User{
    constructor(
       public _id : String,
       public fullname : String,
       public username : String,
       public email : String,
       public password : String,
       public active : Boolean,
       public roles : Array<String>
    ){

    }
}