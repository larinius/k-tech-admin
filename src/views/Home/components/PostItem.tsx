/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo } from 'react';
import { Divider, theme, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { CSSObject } from '@emotion/react';
import type { GlobalToken } from 'antd/es/theme/interface';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import avatar from '@/assets/avatar.png';
import { deletePostAsync } from '@/store/modules/post';
import type { Post } from '@/interfaces/postInterface';
import { Category } from '@/interfaces/categoryInterface';
import { User } from '@/interfaces/userInterface';
import { useCategories, usePosts, useUsers } from '@/server/apiHooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setEditMode, setSelectedPost } from '@/store/modules/app';
import { createErrorModal, createSuccessModal } from '@/hooks/web/useMessage';

const getPostItem = (token: GlobalToken): CSSObject => {
  return {
    height: 150,
    overflowY: 'hidden',
    '.item': {
      display: 'flex',
      '.item-content': {
        marginLeft: 14,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        '.title': {
          fontSize: token.fontSize,
        },
        '.time': {
          fontSize: token.fontSizeSM,
        },
        '.text': {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
        },
      },
    },
    '.button-group': {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '8px',
      '.edit-button': {
        marginLeft: 'auto',
        marginRight: '8px',
      },
    },
  };
};

const PostItem = memo(({ post }: { post: Post }) => {
  const dispatch = useAppDispatch();
  const app = useAppSelector((state) => state.app);
  const navigate = useNavigate();
  const thme = theme.useToken();
  const { refetch } = usePosts();
  const { categories } = useCategories();
  const { users } = useUsers();

  const formattedDate = moment(post.createdAt).format('MMM D, YYYY');

  const category = categories.find((cat) => cat.id === post.categoryId);
  const user = users.find((u) => u.id === post.author);

  const handleEditClick = (postId: number) => {
    console.log(postId);
    dispatch(setEditMode(true));
    dispatch(setSelectedPost(postId));
  };

  const handleDeletePost = async (postId: number) => {
    dispatch(deletePostAsync(postId))
      .then((response) => {
        console.log(response);
        refetch();
        createSuccessModal('Post deleted!');
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
        createErrorModal('Error deleting post');
      });
  };

  return (
    <div css={getPostItem(thme.token)}>
      <ul>
        <li>
          <div className="item">
            <img
              src={`${import.meta.env.VITE_APP_IMAGES_PATH}/${post.header_image}` || avatar}
              alt="Post Image"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <div className="item-content">
              <span className="title">{post.title}</span>
              <span className="time">
                {formattedDate} by {user?.firstname} {user?.lastname} in{' '}
                {category ? category.categoryName : 'Uncategorized'}
              </span>
              <span className="text">{post.content}</span>
            </div>
          </div>
          <div className="button-group">
            <Button
              type="link"
              shape="circle"
              icon={<EditOutlined />}
              className="edit-button"
              onClick={() => handleEditClick(post.id)}
            />
            <Button
              type="link"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDeletePost(post.id)}
            />
          </div>
          <Divider />
        </li>
      </ul>
    </div>
  );
});

export default PostItem;
