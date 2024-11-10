import Document from "mongoose";

export default interface ibook extends Document {
  name: string;
  author: string;
  publishYear: number;
}
