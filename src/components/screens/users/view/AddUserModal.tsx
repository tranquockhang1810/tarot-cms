import { Button, Col, Form, Input, Modal, Row } from "antd"

const AddUserModal = ({
  open,
  onClose,
  addAdmin,
  addLoading
}: {
  open: boolean,
  onClose: () => void,
  addAdmin: (values: any) => Promise<void>,
  addLoading: boolean
}) => {
  return (
    <Modal
      title={<span className="text-xl font-bold">Thêm admin</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      destroyOnClose
      maskClosable={false}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        onFinish={addAdmin}
      >
        <Row gutter={16}>
          <Col span={24} lg={8}>
            <Form.Item
              label={<span className="font-bold">{"Họ tên"}</span>}
              name={"name"}
              rules={[{ required: true, message: "Vui lòng nhập tên" }]}
            >
              <Input placeholder="Nhập họ tên" />
            </Form.Item>
          </Col>
          <Col span={24} lg={8}>
            <Form.Item
              label={<span className="font-bold">{"Email"}</span>}
              name={"email"}
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="Nhập email" type="email" />
            </Form.Item>
          </Col>
          <Col span={24} lg={8}>
            <Form.Item
              label={<span className="font-bold">{"Số ĐT"}</span>}
              name={"phone"}
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" }
              ]}
            >
              <Input placeholder="Nhập số điện thoại" type="tel" maxLength={10} />
            </Form.Item>
          </Col>
          <Col span={24} lg={12}>
            <Form.Item
              label={<span className="font-bold">{"Mật khẩu"}</span>}
              name={"password"}
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu" minLength={6} />
            </Form.Item>
          </Col>
          <Col span={24} lg={12}>
            <Form.Item
              label={<span className="font-bold">{"Xác nhận mật khẩu"}</span>}
              name={"confirmPassword"}
              rules={
                [
                  { required: true, message: "Vui lòng nhập lại mật khẩu" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp"))
                    },
                  }),
                ]
              }
            >
              <Input.Password placeholder="Nhập lại mật khẩu" minLength={6} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={addLoading}
              >
                Thêm admin
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddUserModal