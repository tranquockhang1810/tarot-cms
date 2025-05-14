import { ResultObject } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { TransactionsRequestModel, TransactionsResponseModel } from "@/api/features/transactions/models/TransactionsModel";
import { defaultTransactionsRepo } from "@/api/features/transactions/TransactionsRepository";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const TransactionsViewModel = () => {
  const [resultObject, setResultObject] = useState<ResultObject | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<TransactionsResponseModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState<TransactionsRequestModel>({
    page: 1,
    limit: 10,
    fromDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    toDate: dayjs().format("YYYY-MM-DD"),
  });
  const [selectedTrans, setSelectedTrans] = useState<TransactionsResponseModel | null>(null);

  const handleTableChange = (pagination?: any) => {
    setPage(pagination?.current);
    setLimit(pagination?.pageSize);
    setQuery({
      ...query,
      page: pagination?.current,
      limit: pagination?.pageSize
    });
  }

  const getTransactions = async (query: TransactionsRequestModel) => {
    try {
      setLoading(true);
      const res = await defaultTransactionsRepo.getTransactions(query);
      if (res?.code === 200 && res?.data) {
        setTransactions(res?.data || []);
        setTotal(res?.paging?.total || 0);
      }
    } catch (error: any) {
      setResultObject({
        type: "error",
        content: error?.message || "Có lỗi xảy ra",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTransactions(query);
  }, [query]);

  return {
    resultObject,
    setQuery,
    loading,
    transactions,
    page,
    limit,
    total,
    handleTableChange,
    setSelectedTrans,
    selectedTrans,
  }
}

export default TransactionsViewModel