import { useAuth } from "@/context/auth/useAuth";
import { Button, Col, Modal, Row } from "antd"
import { CiLogin } from "react-icons/ci";

const ProfileView = ({
  open,
  onClose
}: {
  open: boolean,
  onClose: () => void
}) => {
  const { user, onLogout } = useAuth();
  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      destroyOnClose
      maskClosable={false}
      width={500}
      title={<span className="text-xl font-bold">Tài khoản</span>}
      footer={null}
    >
      <Row gutter={[32, 16]} className="w-full">
        <Col span={10} className="font-bold">
          Tài khoản đăng nhập:
        </Col>
        <Col span={14} className="text-right">
          {user?.name}
        </Col>
        <Col span={10} className="font-bold">
          Email:
        </Col>
        <Col span={14} className="text-right">
          {user?.email}
        </Col>
        <Col span={10} className="font-bold">
          Số điện thoại:
        </Col>
        <Col span={14} className="text-right">
          {user?.phone}
        </Col>
      </Row>
      <Row gutter={[32, 16]} className="w-full mt-4" justify={"end"}>
        <Button type="primary" danger onClick={onLogout} icon={<CiLogin />}>Đăng xuất</Button>
      </Row>
    </Modal>
  )
}

export default ProfileView