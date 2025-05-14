import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { DashboardModel } from "./models/DashboardModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";

export interface IHomeRepository {
  getBillChart(): Promise<BaseApiResponseModel<DashboardModel>>;
  getTopicChart(): Promise<BaseApiResponseModel<DashboardModel>>;
  getUserChart(): Promise<BaseApiResponseModel<DashboardModel>>;
}

class HomeRepository implements IHomeRepository {
  getBillChart(): Promise<BaseApiResponseModel<DashboardModel>> {
    return client.get(ApiPath.BILL_CHART);
  }

  getTopicChart(): Promise<BaseApiResponseModel<DashboardModel>> {
    return client.get(ApiPath.TOPIC_CHART);
  }

  getUserChart(): Promise<BaseApiResponseModel<DashboardModel>> {
    return client.get(ApiPath.USER_CHART);
  }
}

export const defaultHomeRepository = new HomeRepository();