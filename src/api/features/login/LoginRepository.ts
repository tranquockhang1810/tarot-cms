import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { LoginRequestModel, LoginResponseModel } from "./models/LoginModel";

interface ILoginRepository {
  login(params: LoginRequestModel): Promise<BaseApiResponseModel<LoginResponseModel>>;
}

class LoginRepository implements ILoginRepository {
  async login(params: LoginRequestModel): Promise<BaseApiResponseModel<LoginResponseModel>> {
    return await client.post(ApiPath.LOGIN, params);
  }
}

export const defaultLoginRepository = new LoginRepository();