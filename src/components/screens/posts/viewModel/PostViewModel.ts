import { ResultObject } from "@/api/baseApiResponseModel/baseApiResponseModel";
import { PostRequestModel } from "@/api/features/post/models/PostRequestModel";
import { PostResponseModel } from "@/api/features/post/models/PostResponseModel";
import { defaultPostRepo } from "@/api/features/post/PostRepo";
import { UploadFile } from "antd";
import { useEffect, useState } from "react";

const PostViewModel = () => {
  const [resultObject, setResultObject] = useState<ResultObject | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostResponseModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState<PostRequestModel>({
    page: 1,
    limit: 10,
  });
  const [selectedPost, setSelectedPost] = useState<PostResponseModel | null>(null);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);

  const getPosts = async (query: PostRequestModel) => {
    try {
      setLoading(true);
      const res = await defaultPostRepo.getPosts(query);
      if (res?.data) {
        setPosts(res?.data || []);
        setTotal(res?.paging?.total || 0);
      }
    } catch (error: any) {
      setResultObject({
        type: "error",
        content: error?.message || "Có lỗi xảy ra, vui lòng thử lại sau!"
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleTableChange = (pagination?: any) => {
    setPage(pagination?.current);
    setLimit(pagination?.pageSize);
    setQuery({
      ...query,
      page: pagination?.current,
      limit: pagination?.pageSize
    });
  }

  const deletePost = async (id: string) => {
    try {
      setLoading(true);
      const res = await defaultPostRepo.deletePost(id);
      if (res?.code === 200) {
        setResultObject({
          type: "success",
          content: "Xóa bài viết thành công!"
        });
        getPosts(query);
      }
    } catch (error: any) {
      setResultObject({
        type: "error",
        content: error?.message || "Có lỗi xảy ra, vui lòng thử lại sau!"
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const onEditModalCancel = () => {
    setEditModal(false);
    setSelectedPost(null);
  }

  const updatePost = async (values: any) => {
    try {
      setEditLoading(true);
      const res = await defaultPostRepo.updatePost(selectedPost?._id as string, {
        content: values?.content,
        keepImages: values?.fileList?.filter((file: UploadFile) => !file.originFileObj).map((file: UploadFile) => file.url),
        images: values?.fileList?.filter((file: UploadFile) => file.originFileObj).map((file: UploadFile) => file.originFileObj),
      });
      if (res?.data) {
        setResultObject({
          type: "success",
          content: "Cập nhật bài viết thành công!"
        });
        setEditModal(false);
        setSelectedPost(null);
        getPosts(query);
      }
    } catch (error: any) {
      setResultObject({
        type: "error",
        content: error?.message || "Có lỗi xảy ra, vui lòng thử lại sau!"
      });
      console.error(error);
    } finally {
      setEditLoading(false);
    }
  }

  const onAddModalCancel = () => {
    setAddModal(false);
  }

  const addPost = async (values: any) => {
    try {
      setAddLoading(true);
      const res = await defaultPostRepo.createPost({
        content: values?.content,
        images: values?.fileList?.filter((file: UploadFile) => file.originFileObj).map((file: UploadFile) => file.originFileObj),
      });
      if (res?.data) {
        setResultObject({
          type: "success",
          content: "Thêm bài viết thành công!"
        });
        setAddModal(false);
        getPosts(query);
      }
    } catch (error: any) {
      setResultObject({
        type: "error",
        content: error?.message || "Có lỗi xảy ra, vui lòng thử lại sau!"
      });
      console.error(error);
    } finally {
      setAddLoading(false);
    }
  }

  useEffect(() => {
    getPosts(query);
  }, [query]);

  return {
    resultObject,
    setQuery,
    loading,
    posts,
    page,
    limit,
    total,
    handleTableChange,
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
  }
}

export default PostViewModel