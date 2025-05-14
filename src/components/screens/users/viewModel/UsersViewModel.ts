import { ResultObject } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { UserModel } from "@/api/features/profile/models/UserModel";
import { UsersListRequestModel } from "@/api/features/users/models/UsersManagementModel";
import { defaultUsersRepo } from "@/api/features/users/UserRepository";
import { useEffect, useState } from "react";

const UsersViewModel = () => {
  const [resultObject, setResultObject] = useState<ResultObject | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState<UsersListRequestModel>({
    page: 1,
    limit: 10
  });
  const [addModal, setAddModal] = useState<boolean>(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);

  const handleTableChange = (pagination?: any) => {
    setPage(pagination?.current);
    setLimit(pagination?.pageSize);
    setQuery({
      ...query,
      page: pagination?.current,
      limit: pagination?.pageSize
    });
  }

  const getUsers = async (query: UsersListRequestModel) => {
    try {
      setLoading(true);
      const res = await defaultUsersRepo.getUsers(query);
      if (res?.code === 200 && res?.data) {
        setUsers(res?.data || []);
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

  const acticveAdmin = async (id: string) => {
    try {
      const res = await defaultUsersRepo.activeAdmin(id);
      if (res?.code === 200 && res?.data) {
        setResultObject({
          type: "success",
          content: "Cập nhật tài khoản thành công",
        })
        getUsers(query);
      }
    } catch (error: any) {
      setResultObject({
        type: "error",
        content: error?.message || "Có lỗi xảy ra",
      });
      console.error(error);
    }
  }

  const onAddModalClose = () => {
    setAddModal(false);
  }

  const addAdmin = async (values: any) => {
    try {
      setAddLoading(true);
      const res = await defaultUsersRepo.createAdmin({
        name: values?.name,
        email: values?.email,
        password: values?.password,
        phone: values?.phone,
      });
      if (res?.data) {
        setResultObject({
          type: "success",
          content: "Thêm tài khoản thành công",
        })
        getUsers(query);
        onAddModalClose();
      }
    } catch (error: any) {
      setResultObject({
        type: "error",
        content: error?.message || "Có lỗi xảy ra",
      });
      console.error(error);
    } finally {
      setAddLoading(false);
    }
  }

  useEffect(() => {
    getUsers(query);
  }, [query]);

  return {
    resultObject,
    setQuery,
    loading,
    users,
    page,
    limit,
    total,
    handleTableChange,
    acticveAdmin,
    addModal, setAddModal,
    onAddModalClose,
    addAdmin, addLoading,
  }
}

export default UsersViewModel