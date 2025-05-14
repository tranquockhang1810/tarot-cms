"use client";
import { ResultObject } from "@/api/baseApiResponseModel/baseApiResponseModel";
import React, { useState } from "react";
import { Form } from "antd";
import { useAuth } from "@/context/auth/useAuth";
import { defaultLoginRepository } from "@/api/features/login/LoginRepository";

const LoginViewModel = () => {
  const { onLogin } = useAuth();
  const [form] = Form.useForm();
  const [resultObject, setResultObject] = useState<ResultObject | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any) => {
    try {
      setLoading(true);
      const res = await defaultLoginRepository.login({
        email: values?.email,
        password: values?.password,
      });
      if (res?.data) {
        setResultObject({
          type: "success",
          content: res?.message || "Đăng nhập thành công",
        });
        onLogin(res?.data);
      }
    } catch (error: any) {
      setResultObject({
        type: "error",
        content: error?.error?.message || "Đăng nhập thất bại",
      });
    } finally {
      setLoading(false);
    }
  }

  return {
    resultObject,
    form,
    loading,
    handleLogin,
  }
}

export default LoginViewModel