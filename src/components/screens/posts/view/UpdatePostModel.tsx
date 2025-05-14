import { PostResponseModel } from "@/api/features/post/models/PostResponseModel"
import { Button, Col, Form, Image, Input, Modal, Row, Upload } from "antd"
import dayjs from "dayjs"
import { useState } from "react";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { getBase64 } from "@/utils/helper/GetBase64";
import { GoPlus } from "react-icons/go";
import ImgCrop from "antd-img-crop";
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const UpdatePostModel = ({
  open,
  onCancel,
  post,
  updatePost,
  editLoading
}: {
  open: boolean
  onCancel: () => void,
  post: PostResponseModel,
  updatePost: (values: any) => Promise<void>,
  editLoading: boolean
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
      title="Cập nhật bài viết"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1000}
      centered
      styles={{ body: { maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', scrollbarWidth: 'none' } }}
      maskClosable={false}
    >
      <Row className="w-full" justify={"space-between"}>
        <Col span={24} md={7}>
          <div className="flex flex-row flex-wrap gap-2 items-center justify-between">
            <span className="font-bold">ID:</span>
            <span className="text-base">{post?._id}</span>
          </div>
        </Col>
        <Col span={24} md={7}>
          <div className="flex flex-row flex-wrap gap-2 items-center justify-between">
            <div className="font-bold">Admin:</div>
            <div className="text-base">{post?.admin?.name}</div>
          </div>
        </Col>
        <Col span={24} md={7}>
          <div className="flex flex-row flex-wrap gap-2 items-center justify-between">
            <div className="font-bold">Thời gian tạo:</div>
            <div className="text-base">{dayjs(post?.createdAt).format('HH:mm:ss DD/MM/YYYY')}</div>
          </div>
        </Col>
      </Row>
      <Form layout="vertical" className="w-full mt-4" requiredMark={false} onFinish={updatePost}>
        <Row className="w-full mt-4">
          <Col span={24}>
            <Form.Item
              label={<span className="font-bold">{"Nội dung bài viết: "}</span>}
              name="content"
              rules={[{ required: true, message: "Vui lòng nhập nội dung bài viết!" }]}
              initialValue={post?.content}
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
              initialValue={post?.images?.map((image: string) => ({ url: image, status: "done" }))}
              rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
            >
              <UploadWithCrop />
            </Form.Item>
          </Col>
        </Row>
        <Row className="w-full mt-4">
          <Col span={24}>
            <Button htmlType="submit" className="w-full" size="large" type="primary" loading={editLoading}>
              Cập nhật bài viết
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

export default UpdatePostModel