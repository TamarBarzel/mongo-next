import mongoose, {Model,Schema} from "mongoose";
import Ibook from '@/app/types/ibook'

const BookSchema: Schema<Ibook>=new Schema({
    name:{type: String, required:true},
    author:{type: String, required: true},
    publishYear:{type: Number, required: true},
})

const Book :Model<Ibook> =mongoose.models.Book || mongoose.model<Ibook>('Book',BookSchema)
 export default Book;