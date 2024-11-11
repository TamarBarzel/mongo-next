import Document from "mongoose";

export default interface icity extends Document {
  name: string;
  country: string;
}
