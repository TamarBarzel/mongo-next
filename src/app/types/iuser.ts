import Document from "mongoose";

export default interface ichild extends Document{
    email:string,
    firstName:string,
    lastName:string,
    password: string,
    }