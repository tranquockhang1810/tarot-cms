"use client";
import { Button, Col, DatePicker, Form, Row, Select, Table } from "antd";
import TransactionsViewModel from "../viewModel/TransactionsViewModel";
import dayjs from "dayjs";
import { CurrencyFormat } from "@/utils/helper/CurrencyFormat";
import { useEffect } from "react";
import { showToast } from "@/utils/helper/SendMessage";
import { IoDocumentTextSharp } from "react-icons/io5";

const TransactionsView = () => {
  const {
    resultObject,
    setQuery,
    loading,
    transactions,
    page,
    limit,
    total,
    handleTableChange,
    setSelectedTrans,
    selectedTrans
  } = TransactionsViewModel();

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
        <div className="text-xl font-bold">Lịch sử giao dịch</div>
      </div>
      <Form
        className="mt-4 w-full"
        layout="vertical"
        onFinish={(values) => setQuery({
          page: 1,
          limit: 10,
          status: values?.status === "" ? undefined : values?.status,
          fromDate: values?.date?.[0]
            ? dayjs(values?.date?.[0]).startOf("day").format("YYYY-MM-DD")
            : dayjs().startOf("month").format("YYYY-MM-DD"),
          toDate: values?.date?.[1]
            ? dayjs(values?.date?.[1]).endOf("day").format("YYYY-MM-DD")
            : dayjs().endOf("month").format("YYYY-MM-DD"),
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
                  { label: "Thành công", value: true },
                  { label: "Thất bại", value: false },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={12}>
            <Form.Item
              label={<span className="font-bold text-white">{"Ngày"}</span>}
              name={"date"}
              initialValue={[dayjs().startOf("month"), dayjs()]}
            >
              <DatePicker.RangePicker
                className="w-full"
                allowClear={false}
                format="DD/MM/YYYY"
                disabledDate={(current) => current > dayjs()}
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
          { title: "Gói", dataIndex: "package", key: "package", align: "center", width: "15%", render: (_, record) => record?.package?.description },
          { title: "Mã giao dịch", dataIndex: "_id", key: "_id", align: "center" },
          { title: "Khách hàng", dataIndex: "user", key: "user", align: "center", render: (_, record) => record?.user?.name },
          { title: "Tổng tiền", dataIndex: "totalPrice", key: "totalPrice", width: "12%", align: "center", render: (_, record) => CurrencyFormat(record?.totalPrice as number) },
          { title: "Trạng thái", dataIndex: "status", key: "status", align: "center", width: "10%", render: (status) => status ? <span className="text-green-500 font-bold">Thành công</span> : <span className="text-red-500 font-bold">Thất bại</span> },
          { title: "Thời gian tạo", dataIndex: "createdAt", key: "createdAt", align: "center", render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss") },
        ]}
        rowKey="_id"
        dataSource={transactions}
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
        scroll={{ x: 1000, y: 800 }}
      />
    </div>
  )
}

export default TransactionsView