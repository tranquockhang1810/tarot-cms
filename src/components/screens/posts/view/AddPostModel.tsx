import { getBase64 } from "@/utils/helper/GetBase64";
import { UploadFile, Modal, Row, Col, Form, Input, Upload, Button, Image, GetProp, UploadProps } from "antd";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import ImgCrop from 'antd-img-crop';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const AddPostModel = ({
  open,
  onCancel,
  addPost,
  addLoading
}: {
  open: boolean
  onCancel: () => void,
  addPost: (values: any) => Promise<void>,
  addLoading: boolean
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const UploadWithCrop = (props: any) => (
    <ImgCrop>
      <Upload
        listType="picture-card"
        onPreview={handlePreview}
        className="w-full"
        beforeUpload={() => false}
        {...props}
      >
        <div className="flex flex-col items-center justify-center w-full h-full">
          <GoPlus />
          <div style={{ marginTop: 8 }}>Thêm ảnh</div>
        </div>
      </Upload>
    </ImgCrop>
  )

  return (
    <Modal
      title="Thêm bài viết"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1000}
      centered
      styles={{ body: { maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', scrollbarWidth: 'none' } }}
      maskClosable={false}
      destroyOnClose
    >
      <Form layout="vertical" className="w-full mt-4" requiredMark={false} onFinish={addPost}>
        <Row className="w-full mt-4">
          <Col span={24}>
            <Form.Item
              label={<span className="font-bold">{"Nội dung bài viết: "}</span>}
              name="content"
              rules={[{ required: true, message: "Vui lòng nhập nội dung bài viết!" }]}
            >
              <Input.TextArea
                className="w-full"
                placeholder="Nội dung bài viết"
                autoSize={{ minRows: 10, maxRows: 20 }}
                allowClear
                size="large"
                showCount
                spellCheck={false}
              />
            </Form.Item>
          </Col>
          <Col span={24} className="mt-4">

            <Form.Item
              name={"fileList"}
              label={<span className="font-bold">{"Hình ảnh: "}</span>}
              valuePropName="fileList"
              getValueFromEvent={(e: any) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
              rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
            >
              <UploadWithCrop />
            </Form.Item>
          </Col>
        </Row>
        <Row className="w-full mt-4">
          <Col span={24}>
            <Button htmlType="submit" className="w-full" size="large" type="primary" loading={addLoading}>
              Tạo bài viết
            </Button>
          </Col>
        </Row>
      </Form>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </Modal>
  )
}

export default AddPostModel