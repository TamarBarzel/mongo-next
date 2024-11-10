import Document from "mongoose";

export default interface icar extends Document {
  id: string;
  company: string;
  model: string;
  year: number;
}
