import Document from "mongoose";

export default interface iuser extends Document{
    email:string,
    firstName:string,
    lastName:string,
    password: string,
    }