import React, { useState } from 'react';
import NavbarUser from './google-drive/UserNavBar'
import AddFolderButton from './google-drive/AddFolderButton'
import AddFileButton from './google-drive/AddFileButton'
import Folders from './google-drive/Folders';
import { useParams, useLocation, Outlet, useNavigate } from 'react-router'
import { useFolder } from '../hooks/useFolder'
import Folder from './google-drive/Folder'
import File from './google-drive/File'
import { PlusOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import {
  
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  ClearOutlined,
  LoadingOutlined,
  HolderOutlined,
  HeartOutlined,
  MenuOutlined,
  PaperClipOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  FolderOutlined,

} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import FolderBreadcrumbs from './google-drive/FolderBreadcrumbs';

import Signup from './authentication/Signup';

import ProtectedRoute from "./authentication/ProtectedRoute";
import UpdateProfile from "./authentication/UpdateProfile";
import Dashboard from "./google-drive/Dashboard";
import Profile from './authentication/Profile';
import HomePage from './google-drive/HomePage';
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
  getItem('Favorite', 'favorite', <HeartOutlined />),
  getItem('Library', 'library', <MenuFoldOutlined />,),
  getItem('Folders', 'folder/root', <FolderOutlined/>),
  getItem('Profile', 'profile', <UserOutlined />,),
  getItem('Logout', 'logout', <LogoutOutlined />),
  
];
const DashboardComponent = () => <div><UIExperimental/></div>;
const FoldersComponent = () => <div><Folders/></div>;
const Library = () => <div>Lib Content</div>;
const TeamComponent = () => <div>Team Content</div>;
const FilesComponent = () => <div>Files Content</div>;

const App: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
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
        return <FoldersComponent />;
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
          {/* Rest of the code */}
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
          <Outlet /> 
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', fontFamily: 'initial' }}>My Drive ©2023 </Footer>
      </Layout>
    </Layout>
    </>
  );
};

export default App;



{/* <Content style={{ margin: '0 16px ' }}>
           <FolderBreadcrumbs currentFolder={folder} />
              <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">              
                <div className="flex flex-row-reverse">
                  <AddFileButton currentFolder={folder} />
                  <AddFolderButton currentFolder={folder} />
                  </div>
              </div>
          
          {childFolders.length > 0 && (
            
            <div className='flex justify-around '>
              <div className="grid grid-cols-4 grid-flow-row gap-7 ">
              {
                childFolders.map((childFolder: any)  => (
                  <div
                    key={childFolder.id}
                    style={{maxWidth: "150px"}}
                    className='p-10'
                  >
                    <Folder folder={childFolder} onPress={(fold)=>setCurrentFolder(fold)}/>

                  </div>

                ) )}

            </div>
            </div>
          )}
          {childFolders.length > 0 && childFiles.length > 0 && <hr />}
          {childFiles.length > 0 && (
              <div className='flex justify-evenly  '>
                <div className="grid grid-cols-4 grid-flow-row gap-7">
              {
                childFiles.map((childFile: any) => (
                  <div
                    key={childFile.id}
                    style={{maxWidth: "150px"}}
                    className='p-2'
                  >
                    <File file={childFile}/>
                  </div>
                ) )}
            </div>
            </div>
            
          )}
        </Content> */}




  
