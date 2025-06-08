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
