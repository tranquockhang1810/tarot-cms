"use client";
import { App, Button, Col, Form, Input, Row, Select, Table } from "antd";
import UsersViewModel from "../viewModel/UsersViewModel";
import { useEffect } from "react";
import { showToast } from "@/utils/helper/SendMessage";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import AddUserModal from "./AddUserModal";

const UsersView = () => {
  const {
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
    addAdmin, addLoading
  } = UsersViewModel();
  const { modal } = App.useApp();

  useEffect(() => {
    if (resultObject?.type) {
      showToast({
        type: resultObject?.type,
        content: resultObject?.content
      });
    }
  }, [resultObject]);
  return (
    <div className="max-h-screen overflow-y-auto p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">Quản lý người dùng</div>
        <Button
          type="primary"
          shape="round"
          icon={<HiUserAdd />}
          onClick={() => {
            setAddModal(true);
          }}
          className="flex items-center gap-2"
          size="large"
        >
          Thêm admin
        </Button>
      </div>
      <Form
        className="mt-4 w-full"
        layout="vertical"
        onFinish={(values) => setQuery({
          page: 1,
          limit: 10,
          status: values?.status === "" ? undefined : values?.status,
          email: values?.email,
        })}
      >
        <Row className="w-full mt-4" gutter={16}>
          <Col span={24} lg={12}>
            <Form.Item
              label={<span className="font-bold text-white">{"Trạng thái"}</span>}
              name={"status"}
              initialValue={""}
            >
              <Select
                className="w-full"
                allowClear={false}
                placeholder="Chọn loại giao dịch"
                options={[
                  { label: "Tất cả", value: "" },
                  { label: "Kích hoạt", value: true },
                  { label: "Khóa", value: false },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={12}>
            <Form.Item
              label={<span className="font-bold text-white">{"Email"}</span>}
              name={"email"}
              initialValue={""}
            >
              <Input
                className="w-full"
                placeholder="Nhập email người dùng"
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="w-full" gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        className="mt-4 bg-white px-2 mr-4 rounded-lg shadow-md"
        columns={[
          { title: "STT", dataIndex: "stt", align: "center", key: "stt", render: (_, __, index) => index + 1 + ((page - 1) * limit), width: "6%" },
          { title: "Họ tên", dataIndex: "name", key: "name", align: "center" },
          { title: "ID", dataIndex: "_id", key: "_id", align: "center" },
          { title: "Email", dataIndex: "email", key: "email", align: "center" },
          { title: "SĐT", dataIndex: "phone", key: "phone", align: "center", width: "10%" },
          { title: "Trạng thái", dataIndex: "status", key: "status", align: "center", width: "10%", render: (status) => status ? <span className="text-green-500 font-bold">Kích hoạt</span> : <span className="text-red-500 font-bold">Khóa</span> },
          {
            title: "Hành động",
            key: "action",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (_, record) =>
              <div className="flex items-center justify-center gap-2 w-full">
                <Button
                  type="primary"
                  ghost
                  danger={record?.status}
                  shape="circle"
                  icon={record?.status ? <FaLock /> : <FaLockOpen />}
                  onClick={() => modal.confirm({
                    centered: true,
                    title: `${record?.status ? "Khóa" : "Kích hoạt"} tài khoản`,
                    content: `Bạn có chắc chắn muốn ${record?.status ? "khóa" : "kích hoạt"} tài khoản này không?`,
                    okText: "Xác nhận",
                    cancelText: "Hủy",
                    okType: record?.status ? "danger" : "primary",
                    onOk: () => acticveAdmin(record?._id as string)
                  })}
                />
              </div>
          },
        ]}
        rowKey="_id"
        dataSource={users}
        pagination={{
          current: page,
          pageSize: limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showTotal: (total) => <span className="left-0 absolute font-medium">{`Tổng: ${total}`}</span>,
        }}
        onChange={handleTableChange}
        loading={loading}
        scroll={{ x: 1200, y: 800 }}
      />
      {addModal && (
        <AddUserModal
          open={addModal}
          onClose={onAddModalClose}
          addAdmin={addAdmin}
          addLoading={addLoading}
        />
      )}
    </div>
  )
}

export default UsersView