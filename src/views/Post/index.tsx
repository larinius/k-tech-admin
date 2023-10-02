/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Upload, Form, Input, Row, Select, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { createPostAsync, updatePostAsync, deletePostAsync } from '@/store/modules/post';
import { setEditMode, setSelectedPost } from '@/store/modules/app';

import { useCategories, usePosts, usePost } from '@/server/apiHooks';
import { createErrorModal, createSuccessModal } from '@/hooks/web/useMessage';

import avatar from '@/assets/avatar.png';

const { Option } = Select;

const PostPage = ({ id }: { id: number | null }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const app = useAppSelector((state) => state.app);
  const { categories } = useCategories();
  const { refetch: refetchAllPosts } = usePosts();

  const [imageFile, setImageFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const { post, isLoading, refetch: refetchSelectedPost } = usePost(app.selectedPost);
  const [form] = Form.useForm();

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    if (post !== undefined && post !== null) {
      form.setFieldsValue({
        title: post.title,
        content: post.content,
        category: post.categoryId,
      });
    }
  }, [isLoading]);

  const handleSubmitButton = async () => {
    if (app.editMode === true) {
      handleUpdatePost();
    } else {
      handleCreatePost();
    }
  };

  const handleUpdatePost = async () => {
    const values = form.getFieldsValue();

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('category', `${selectedCategory}`);
    formData.append('author', '1');

    if (imageFile) {
      formData.append('image', imageFile);
    }

    dispatch(updatePostAsync({ formData, postId: post.id }))
      .then((response) => {
        refetchSelectedPost();
        refetchAllPosts();
        createSuccessModal('Post updated!');
      })
      .catch((error) => {
        createErrorModal('Error updating post');
      });
  };

  const handleCreatePost = async () => {
    const values = form.getFieldsValue();

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('category', `${selectedCategory}`);
    formData.append('author', '1');

    if (imageFile) {
      formData.append('image', imageFile);
    }

    dispatch(createPostAsync(formData))
      .then((response) => {
        const payload = response.payload as { data: { post: { id: number } } };
        const newPostId = payload.data.post.id;

        dispatch(setEditMode(true));
        dispatch(setSelectedPost(newPostId));

        refetchSelectedPost();
        refetchAllPosts();
        createSuccessModal('Post created!');
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        createErrorModal('Error creating post');
      });
  };

  const handleDeletePost = async (postId: number) => {
    dispatch(deletePostAsync(postId))
      .then((response) => {
        refetchAllPosts();
        createSuccessModal('Post deleted!');
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
        createErrorModal('Error deleting post');
      });
  };

  const handleImageUpload = (file: any) => {
    setImageFile(file);
    return false;
  };

  const handleCansel = () => {
    dispatch(setEditMode(false));
    navigate(`/home`, { replace: true });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '600px', margin: '30px auto' }}>
        <Form form={form} onFinish={handleSubmitButton} initialValues={{ title: '', content: '' }}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter a title',
              },
            ]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select value={selectedCategory} onChange={(value) => setSelectedCategory(value)}>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {post && post.header_image && (
            <Form.Item label="Header Image">
              <Image
                src={`${import.meta.env.VITE_APP_IMAGES_PATH}/${post.header_image}` || avatar}
                alt="Header Image"
                width={100}
              />
            </Form.Item>
          )}
          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: 'Please enter content',
              },
            ]}
          >
            <Input.TextArea placeholder="Content" rows={12} />
          </Form.Item>
          <Row style={{ margin: 30 }}>
            <Upload beforeUpload={handleImageUpload} showUploadList={false}>
              <Button>Upload Image</Button>
            </Upload>
          </Row>
          <Row style={{ margin: 30, justifyContent: 'space-between' }}>
            <Button onClick={handleCansel}>Cancel</Button>
            <Button disabled={!app.editMode} onClick={() => handleDeletePost(post.id)}>
              Delete
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default PostPage;
