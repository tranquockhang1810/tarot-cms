import { UserModel } from "../../profile/models/UserModel"

export interface LoginRequestModel {
  email?: string
  password?: string
}

export interface LoginResponseModel {
  accessToken?: string
  user?: UserModel
  registerInfo?: {
    id?: string,
    name?: string
  }
}