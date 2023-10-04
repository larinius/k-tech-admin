import { memo } from 'react';
import { Avatar, Divider, theme } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { CSSObject } from '@emotion/react';
import type { GlobalToken } from 'antd/es/theme/interface';
import avatar from '@/assets/avatar.png';

const getCommentItem = (token: GlobalToken): CSSObject => {
  return {
    height: 450,
    overflowY: 'auto',
    ['.item']: {
      display: 'flex',
      ['.item-content']: {
        marginLeft: 14,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        ['.title']: {
          fontSize: token.fontSize,
        },
        ['time']: {
          fontSize: token.fontSizeSM,
        },
        ['.text']: {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          ' -webkit-box-orient': 'vertical',
        },
      },
    },
  };
};

const Comment = memo(() => {
  const thme = theme.useToken();

  return (
    <div css={getCommentItem(thme.token)}>
      <ul>
        {[1, 2, 3, 4].map((i) => {
          return (
            <li key={i}>
              <div className="item">
                <Avatar size={52} icon={<UserOutlined />} src={avatar} />
                <div className="item-content">
                  <span className="title">Sample title</span>
                  <span className="time">2021-12-31</span>
                  <span className="text">
                    Quis amet excepteur irure ut elit non elit irure labore ullamco. Pariatur aliqua
                    ullamco nisi incididunt sint dolore eu proident officia nisi officia
                    reprehenderit. Adipisicing duis esse cupidatat cillum culpa proident voluptate
                    sint dolor. Deserunt reprehenderit reprehenderit nisi quis dolore qui.
                  </span>
                </div>
              </div>
              <Divider />
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Comment;
