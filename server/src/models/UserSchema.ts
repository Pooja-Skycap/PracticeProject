import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  age: number;
  address: string;
  status: 'active' | 'inactive';
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
