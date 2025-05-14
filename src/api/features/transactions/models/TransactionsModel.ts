import { UserModel } from "../../profile/models/UserModel";

export interface TransactionsRequestModel {
  page?: number;
  limit?: number;
  fromDate?: string;
  toDate?: string;
  status?: boolean;
}

export interface TransactionsResponseModel {
  _id?: string;
  user?: UserModel;
  package?: {
    _id?: string;
    name?: string;
    price?: number;
    description?: string;
  };
  totalPrice?: number;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}