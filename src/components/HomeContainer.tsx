import React, { useState } from 'react';

import Folders from './google-drive/Folders';
import { useParams, Outlet, useNavigate } from 'react-router'
import { useFolder } from '../hooks/useFolder'

import {
  PieChartOutlined,
  UserOutlined,
  HeartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  FolderOutlined,
  DeleteOutlined,
  
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Layout, Menu, theme } from 'antd';


import Dashboard from "./google-drive/Dashboard";

import UIExperimental from './google-drive/UIExperimental';
import UpdateProfileDrawer from './google-drive/UpdateProfileDrawer';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', 'dashboard', <PieChartOutlined />),
  getItem('Favorites', 'favorites', <HeartOutlined />),
  getItem('Library', 'library', <MenuFoldOutlined />,),
  getItem('Trash', 'trash', <DeleteOutlined />,),
  getItem('Folders', 'folder/root', <FolderOutlined/>),
  getItem('Profile', 'profile', <UserOutlined />,),
  getItem('Logout', 'logout', <LogoutOutlined />),
  
];
// const FoldersComponent = () => <div><Folders/></div>;
const Library = () => <div>Lib Content</div>;
const TeamComponent = () => <div>Team Content</div>;
const FilesComponent = () => <div>Files Content</div>;

const App: React.FC = () => {
   
  const { folderId } = useParams<{ folderId: string }>();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate()
  const [ curentFolder, setCurrentFolder ]= useState()
  const { folder, childFolders, childFiles } = useFolder(folderId, curentFolder)
    console.log(folder,'folrder>>>')
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderContentComponent = () => {
    switch (selectedOption) {
      case '1':
        return <Dashboard />;
      case '2':
        // return <FoldersComponent />;
      case '3':
        return <Folders />;
      case '4':
        return <Library/>;
      
      case '5':
        return <TeamComponent />;
      case '6':
      case '8':
        return <TeamComponent />;
      case '9':
        return <FilesComponent />;
      default:
        return null;
    }
  };

  return (
    <>
    <Layout style={{ minHeight: '100vh' }}>
        
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
       
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onSelect={(menuItem) => navigate(`/home/${menuItem
            .key}`)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <UpdateProfileDrawer/>
        <UIExperimental/>
        <Content style={{ margin: '0 16px', paddingTop: 16 }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
          <Outlet /> 
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', fontFamily: 'initial' }}>My Drive Â©2023 </Footer>
      </Layout>
    </Layout>
    </>
  );
};

export default App;
