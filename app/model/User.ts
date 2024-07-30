// src/models/User.ts

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for a Subject
export interface ISubject extends Document {
  name: string;
  attended: number;
  total: number;
}

// Define the schema for a Subject
export const SubjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  attended: { type: Number, required: true },
  total: { type: Number, required: true }
});

// Define the interface for a User
export interface IUser extends Document {
  name: string;
  user: string;
  subjects: ISubject[];
}

// Define the schema for a User
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  user: { type: String, required: true },
  subjects: [SubjectSchema]
});

// Create the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
