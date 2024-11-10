import mongoose, {Model,Schema} from "mongoose";
import Icar from '@/app/types/icar'

const CarSchema: Schema<Icar>=new Schema({
    id:{type: String, required:true,unique:true},
    company:{type: String, required: true},
    model:{type: String, required: true},
    year:{type: Number, required: true},
})

const Car :Model<Icar> =mongoose.models.Car || mongoose.model<Icar>('Car',CarSchema)
 export default Car;