import React, { MouseEvent } from 'react';
import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

interface OptionsMenuProps {
  onOptionSelected: (option: string) => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ onOptionSelected }) => {
  const handleMenuClick = (e: { key: React.Key }) => {
    onOptionSelected(e.key as string);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="delete">Delete</Menu.Item>
      {/* <Menu.Item key="restore">Restore</Menu.Item> */}
      <Menu.Item key="addToFavorites">Add to Favorites</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} >
      <a className="ant-dropdown-link" onClick={(e: MouseEvent) => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );
};

export default OptionsMenu;