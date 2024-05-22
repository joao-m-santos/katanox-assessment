import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Menu, type MenuProps } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Properties',
    key: 'properties',
  },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Menu
      defaultSelectedKeys={['properties']}
      mode="horizontal"
      theme="dark"
      items={items}
      onClick={onClick}
    />
  );
};

export default Navbar;
