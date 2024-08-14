import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  age: number;
  address: string;
  status: "active" | "inactive";
  genre?: string;
  hobbies?: string[];
  dateOfBirth?: Date;
  email?: string;
  password?: string;
  phoneNumber?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], required: true },
  genre: { type: String },
  hobbies: { type: [String] },
  dateOfBirth: { type: Date },
  email: { type: String, unique: true },
  password: { type: String },
  phoneNumber: { type: String },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
