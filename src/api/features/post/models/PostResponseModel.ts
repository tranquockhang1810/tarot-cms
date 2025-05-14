import { UserModel } from "../../profile/models/UserModel";

export interface PostResponseModel {
  _id?: string;
  admin?: UserModel;
  content?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}