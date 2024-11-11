import mongoose, {Model,Schema} from "mongoose";
import Icity from '@/app/types/icity'

const CitySchema: Schema<Icity>=new Schema({
    name:{type: String, required: true},
    country:{type: String, required: true},
})

const City :Model<Icity> =mongoose.models.City || mongoose.model<Icity>('City',CitySchema)
 export default City;