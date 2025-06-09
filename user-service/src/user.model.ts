/**
 * Mongoose model and TypeScript interface for User documents.
 *
 * - Defines the IUser interface for type safety
 * - Sets up the user schema with required fields
 * - Exports the UserModel for database operations
 */

import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default UserModel;
