import { TransferToFormData } from "@/utils/helper/TransferToFormData";
import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { PostRequestModel } from "./models/PostRequestModel";
import { PostResponseModel } from "./models/PostResponseModel";
import { PostUpdateRequestModel } from "./models/PostUpdateRequestModel";

interface IPostRepo {
  getPosts(params: PostRequestModel): Promise<BaseApiResponseModel<PostResponseModel[]>>;
  deletePost(id: string): Promise<BaseApiResponseModel<any>>;
  createPost(params: PostUpdateRequestModel): Promise<BaseApiResponseModel<PostResponseModel>>;
  updatePost(id: string, params: PostUpdateRequestModel): Promise<BaseApiResponseModel<PostResponseModel>>;
}

class PostRepo implements IPostRepo {
  async getPosts(params: PostRequestModel): Promise<BaseApiResponseModel<PostResponseModel[]>> {
    return await client.get(ApiPath.GET_POSTS, params);
  }

  async deletePost(id: string): Promise<BaseApiResponseModel<any>> {
    return await client.delete(`${ApiPath.DELETE_POST}/${id}`);
  }

  async createPost(params: PostUpdateRequestModel): Promise<BaseApiResponseModel<PostResponseModel>> {
    const formData = TransferToFormData(params);
    return await client.post(ApiPath.CREATE_POST, formData, { headers: { "Content-Type": "multipart/form-data" } });
  }

  async updatePost(id: string, params: PostUpdateRequestModel): Promise<BaseApiResponseModel<PostResponseModel>> {
    const formData = TransferToFormData(params);
    return await client.put(`${ApiPath.UPDATE_POST}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
  }
}

export const defaultPostRepo = new PostRepo();