"use client"
import { showToast } from "@/utils/helper/SendMessage"
import { Button, Table, App } from "antd"
import dayjs from "dayjs"
import { useEffect } from "react"
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import PostViewModel from "../viewModel/PostViewModel"
import UpdatePostModel from "./UpdatePostModel"
import AddPostModel from "./AddPostModel"

const PostView = () => {
  const {
    resultObject,
    handleTableChange,
    loading,
    posts,
    page,
    limit,
    total,
    deletePost,
    setSelectedPost,
    selectedPost,
    editModal,
    setEditModal,
    onEditModalCancel,
    updatePost, editLoading,
    addModal, setAddModal,
    onAddModalCancel,
    addPost, addLoading
  } = PostViewModel();
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
        <div className="text-xl font-bold">Quản lý bài viết</div>
        <Button
          type="primary"
          shape="round"
          icon={<CiEdit />}
          onClick={() => {
            setAddModal(true);
          }}
          className="flex items-center gap-2"
          size="large"
        >
          Thêm bài viết
        </Button>
      </div>
      <Table
        className="mt-4 bg-white px-2 rounded-lg shadow-md"
        columns={[
          { title: "Nội dung", dataIndex: "content", key: "content", align: "justify", width: 500, render: (content) => <div className="max-w-[500px] truncate">{content}</div> },
          { title: "Người tạo", dataIndex: "admin", key: "admin", align: "center", render: (_, record) => record?.admin?.name },
          { title: "Thời gian tạo", dataIndex: "createdAt", key: "createdAt", align: "center", render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss") },
          {
            title: "Hành động",
            key: "action",
            align: "center",
            fixed: "right",
            width: 150,
            render: (_, record) =>
              <div className="flex items-center justify-center gap-2 w-full">
                <Button
                  type="primary"
                  ghost
                  shape="circle"
                  icon={<CiEdit />}
                  onClick={() => {
                    setSelectedPost(record);
                    setEditModal(true);
                  }}
                />
                <Button
                  type="primary"
                  ghost
                  danger
                  shape="circle"
                  icon={<MdDelete />}
                  onClick={() => modal.confirm({
                    centered: true,
                    title: "Xóa bài viết",
                    content: `Bạn có chắc chắn muốn xóa bài viết này không?`,
                    okText: "Xóa",
                    cancelText: "Hủy",
                    onOk: () => deletePost(record?._id as string)
                  })}
                />
              </div>
          },
        ]}
        rowKey="_id"
        dataSource={posts}
        pagination={{
          current: page,
          pageSize: limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showTotal: (total) => <span className="left-0 absolute font-medium">{`Tổng: ${total}`}</span>
        }}
        onChange={handleTableChange}
        loading={loading}
        scroll={{ x: 1400, y: 500 }}
      />
      {editModal && selectedPost && (
        <UpdatePostModel
          open={editModal}
          onCancel={onEditModalCancel}
          post={selectedPost}
          updatePost={updatePost}
          editLoading={editLoading}
        />
      )}
      {addModal && (
        <AddPostModel
          open={addModal}
          onCancel={onAddModalCancel}
          addPost={addPost}
          addLoading={addLoading}
        />
      )}
    </div>
  )
}

export default PostView