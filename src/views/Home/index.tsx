/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useState } from 'react';
import { Card, Col, Row, theme, Button } from 'antd';
import './index.less';

import { useQuery } from 'react-query';
import Comment from './components/Comment';
import PostItem from './components/PostItem';
import { useCategories, usePosts } from '@/server/apiHooks';
import type { PostInterface, Category } from '@/store/modules/post';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Post from '@/views/Post';

const Home = memo(() => {
  const dispatch = useAppDispatch();
  const app = useAppSelector((state) => state.app);

  const { posts } = usePosts();

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  useEffect(() => {
    console.log(`Edit post: ${app.selectedPost}, ${app.editMode}`);
  }, [app.selectedPost, app.editMode]);

  return (
    <div className="">
      <Row gutter={[12, 12]}>
        <Col lg={24} sm={24} xs={24}>
          <Card size="small" title={app.editMode ? 'Edit Post' : 'Posts list'}>
            {app.editMode ? (
              <Post id={app.selectedPost} />
            ) : (
              <>
                {posts.length > 0 ? (
                  <ul>
                    {posts.map((post: PostInterface) => (
                      <li key={post.id}>
                        <PostItem post={post} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No posts available.</p>
                )}
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default Home;
