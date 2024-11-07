import mongoose, {Model,Schema} from "mongoose";
import Iuser from '@/app/types/iuser'

const UserSchema: Schema<Iuser>=new Schema({
    email:{type: String, required:true,unique:true},
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    password:{type: String, required: true},
})

const User :Model<Iuser> =mongoose.models.User || mongoose.model<Iuser>('User',UserSchema)
 export default User;