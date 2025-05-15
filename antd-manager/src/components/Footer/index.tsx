import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'jscsvip',
          title: '技术成神',
          href: 'https://jscs.vip',
          blankTarget: true,
        }
      ]}
    />
  );
};

export default Footer;
