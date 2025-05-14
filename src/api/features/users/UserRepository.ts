import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { UserModel } from "../profile/models/UserModel";
import { CreateAdminRequestModel, UsersListRequestModel } from "./models/UsersManagementModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";

export interface IUserRepository {
  getUsers: (params: UsersListRequestModel) => Promise<BaseApiResponseModel<UserModel[]>>;
  createAdmin: (data: CreateAdminRequestModel) => Promise<BaseApiResponseModel<UserModel>>;
  activeAdmin: (id: string) => Promise<BaseApiResponseModel<UserModel>>;
}

class UserRepository implements IUserRepository {
  async getUsers(params: UsersListRequestModel): Promise<BaseApiResponseModel<UserModel[]>> {
    return await client.get(ApiPath.GET_USERS, params);
  }

  async createAdmin(data: CreateAdminRequestModel): Promise<BaseApiResponseModel<UserModel>> {
    return await client.post(ApiPath.CREATE_ADMIN, data);
  }

  async activeAdmin(id: string): Promise<BaseApiResponseModel<UserModel>> {
    return await client.put(ApiPath.ACTIVE_ADMIN + "/" + id);
  }
}

export const defaultUsersRepo = new UserRepository();