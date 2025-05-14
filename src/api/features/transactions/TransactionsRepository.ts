import { BaseApiResponseModel } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { TransactionsRequestModel, TransactionsResponseModel } from "./models/TransactionsModel";
import client from "@/api/client";
import { ApiPath } from "@/api/ApiPath";

export interface ITransactiosRepository {
  getTransactions: (params: TransactionsRequestModel) => Promise<BaseApiResponseModel<TransactionsResponseModel[]>>;
}

class TransactionsRepository implements ITransactiosRepository {
  async getTransactions(params: TransactionsRequestModel): Promise<BaseApiResponseModel<TransactionsResponseModel[]>> {
    return await client.get(ApiPath.TRANSACTION_HISTORY, params)
  }
}

export const defaultTransactionsRepo = new TransactionsRepository();