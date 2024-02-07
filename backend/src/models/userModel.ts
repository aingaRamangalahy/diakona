import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  name: string;
  isCandidate: boolean;
  candidateId?: string;
  address: string;
  vote: number;
  profileImage?: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  isCandidate: { type: Boolean, required: true },
  candidateId: { type: String },
  address: { type: String, required: true },
  vote: { type: Number, required: true},
  profileImage: { type: String, required: false }
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;