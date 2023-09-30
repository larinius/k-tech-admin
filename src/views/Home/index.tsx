/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo } from 'react';
import { Card, Col, Row, theme } from 'antd';

import './index.less';

import Comment from './components/Comment';

const Home = memo(() => {
  const thme = theme.useToken();

  return (
    <div className="">
      <Row gutter={[12, 12]}>
        <Col lg={24} sm={24} xs={24}>
          <Card size="small" title="Comment list">
            <Comment />
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default Home;
