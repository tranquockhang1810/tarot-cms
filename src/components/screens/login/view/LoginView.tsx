"use client";
import LoginViewModel from "../viewModel/LoginViewModel";
import { useEffect } from "react";
import { showToast } from "@/utils/helper/SendMessage";
import { Button, Col, ConfigProvider, Form, Input, Row } from "antd";
import logo from "@/app/icon.png";
import Image from "next/image";
import useColor from "@/hooks/useColor";

const LoginView = () => {
  const {
    resultObject,
    form,
    loading,
    handleLogin,
  } = LoginViewModel();
  const { brandPrimaryRGB, brandPrimaryDark } = useColor();

  useEffect(() => {
    if (resultObject?.type) {
      showToast({
        type: resultObject?.type,
        content: resultObject?.content
      });
    }
  }, [resultObject]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {/* Overlay & content */}
      <div className="flex items-center justify-center flex-col max-w-[400px] w-full rounded-lg shadow-lg p-4 mx-4"
        style={{ backgroundColor: brandPrimaryRGB(0.8) }}
      >
        <Row justify={"center"} className="w-full">
          <Col span={12} >
            <Image
              src={logo}
              alt="Logo"
              className="w-full"
            />
          </Col>
        </Row>
        <Row justify={"center"} className="w-full">
          <Col span={24}>
            <div className="text-3xl font-bold text-center">
              {"TAROT CMS"}
            </div>
          </Col>
        </Row>
        <Form
          className="w-full"
          form={form}
          layout="vertical"
          onFinish={handleLogin}
        >
          <Row justify={"center"} className="w-full mt-4">
            <Col span={24}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng điền email" },
                  { pattern: /^\S+@\S+\.\S+$/, message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  placeholder={"Email"}
                  size="large"
                  variant="outlined"
                  type="email"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Vui lòng điền mật khẩu" },
                ]}
              >
                <Input.Password
                  placeholder={"Mật khẩu"}
                  size="large"
                  variant="outlined"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Vui lòng điền mật khẩu" },
                ]}
              >
                <ConfigProvider theme={{ token: { colorPrimary: brandPrimaryDark } }}>
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="w-full"
                  >
                    Đăng nhập
                  </Button>
                </ConfigProvider>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default LoginView;
