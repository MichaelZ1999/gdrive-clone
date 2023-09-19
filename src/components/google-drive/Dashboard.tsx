import React from 'react'

export default function Dashboard() {
  return (
    <div>
      dash
    </div>
  )
}


// import React, { useState } from 'react';
// import NavbarUser from './UserNavBar'
// import AddFolderButton from './AddFolderButton'
// import AddFileButton from './AddFileButton'
// import { useParams, useLocation } from 'react-router'
// import { useFolder } from '../../hooks/useCustom'
// import Folder from './Folder'
// import File from './File'
// import { PlusOutlined } from '@ant-design/icons';
// import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
// import {
  
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined,
//   ClearOutlined,
//   LoadingOutlined,
//   HolderOutlined,
//   HeartOutlined,
//   MenuOutlined,
//   PaperClipOutlined,
//   VideoCameraOutlined,
//   LogoutOutlined,
//   MenuFoldOutlined,

// } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import FolderBreadcrumbs from './FolderBreadcrumbs';
// import UIExperimental from './UIExperimental';


// const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }

// const items: MenuItem[] = [
//   getItem('Dashboard', '1', <PieChartOutlined />),
//   getItem('Favorite', '2', <HeartOutlined />),
//   getItem('Library', 'sub1', <MenuFoldOutlined />,),
//   getItem('Trash', '3', <DesktopOutlined />),
//   getItem('Profile', 'sub2', <UserOutlined />,),
//   getItem('Logout', '9', <LogoutOutlined />),
  
// ];
// const DashboardComponent = () => <div><UIExperimental/></div>;
// const Option2Component = () => <div>Option 2 Content</div>;
// const UserComponent = () => <div>User Content</div>;
// const TeamComponent = () => <div>Team Content</div>;
// const FilesComponent = () => <div>Files Content</div>;

// const Dashboard: React.FC = () => {
//   const { folderId } = useParams<{ folderId: string }>();
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);

//   const [open, setOpen] = useState(false);
//   const [ curentFolder, setCurrentFolder ]= useState()
//   const { folder, childFolders, childFiles } = useFolder(folderId, curentFolder)
//     console.log(folder,'folrder>>>')
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const renderContentComponent = () => {
//     switch (selectedOption) {
//       case '1':
//         return <Dashboard />;
//       case '2':
//         return <Option2Component />;
//       case '3':
//       case '4':
//       case '5':
//         return <UserComponent />;
//       case '6':
//       case '8':
//         return <TeamComponent />;
//       case '9':
//         return <FilesComponent />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//     <Layout style={{ minHeight: '100vh' }}>
        
//       <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
       
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="dark"
//           defaultSelectedKeys={['1']}
//           mode="inline"
//           items={items}
//           onSelect={(menuItem) => setSelectedOption(menuItem.key.toString())}
//         />
//       </Sider>
//       <Layout>
//         <Header style={{ padding: 0 }} />
//         <UIExperimental/>
//         {/* <Content style={{ margin: '0 16px ' }}>
//            <FolderBreadcrumbs currentFolder={folder} />
//               <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">              
//                 <div className="flex flex-row-reverse">
//                   <AddFileButton currentFolder={folder} />
//                   <AddFolderButton currentFolder={folder} />
//                   </div>
//               </div>
          
//           {childFolders.length > 0 && (
            
//             <div className='flex justify-around '>
//               <div className="grid grid-cols-4 grid-flow-row gap-7 ">
//               {
//                 childFolders.map((childFolder: any)  => (
//                   <div
//                     key={childFolder.id}
//                     style={{maxWidth: "150px"}}
//                     className='p-10'
//                   >
//                     <Folder folder={childFolder} onPress={(fold)=>setCurrentFolder(fold)}/>

//                   </div>

//                 ) )}

//             </div>
//             </div>
//           )}
//           {childFolders.length > 0 && childFiles.length > 0 && <hr />}
//           {childFiles.length > 0 && (
//               <div className='flex justify-evenly  '>
//                 <div className="grid grid-cols-4 grid-flow-row gap-7">
//               {
//                 childFiles.map((childFile: any) => (
//                   <div
//                     key={childFile.id}
//                     style={{maxWidth: "150px"}}
//                     className='p-2'
//                   >
//                     <File file={childFile}/>
//                   </div>
//                 ) )}
//             </div>
//             </div>
            
//           )}
//         </Content> */}
//         <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
//             {renderContentComponent()}
//           </div>
        
//         <Footer style={{ textAlign: 'center', fontFamily: 'initial' }}>My Drive ©2023 </Footer>
//       </Layout>
//     </Layout>
//     </>
//   );
// };

// export default Dashboard;





  
