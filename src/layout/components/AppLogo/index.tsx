import { memo } from 'react';
import { Image, theme } from 'antd';
import logo from '@/assets/logo.png';
import './index.less';

const AppLogo = memo(() => {
  const thme = theme.useToken();

  return (
    <div className="app-logo">
      <div className="logo">
        <Image width={38} src={logo} preview={false} />
      </div>
      <div className="name" style={{ color: thme.token.colorText }}>
        K-TECH admin
      </div>
    </div>
  );
});

export default AppLogo;
