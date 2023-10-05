import React from "react";
import Moment from "react-moment";
import moment from "moment";

import {
  Query,
  collection,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import {
  FileTextOutlined,
  PictureOutlined,
  SoundOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Col, Row, Statistic } from "antd";
import { query } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Files Uploaded",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 10,
    },
  },
};

// const Dashboard: React.FC = () => {

export function Dashboard() {
  const [imageCount, setImageCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [audioCount, setAudioCount] = useState(0);

  const [data, setData] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Images",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Videos",
        data: [],
        borderColor: "rgb(1, 90, 100)",
        backgroundColor: "rgba(1, 90, 100, 0.5)",
      },
      {
        label: "Documents",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Audio",
        data: [],
        borderColor: "rgb(40,200, 200)",
        backgroundColor: "rgba(40, 200, 200, 0.5)",
      },
    ],
  });
  //Image Count
  const getImageCount = async () => {
    const ImageQueryRef = query(
      collection(firestore, "files"),
      where("type", "==", "image")
    );
    return onSnapshot(ImageQueryRef, (snapshot) => {
      setImageCount(snapshot.size);
    });
  };

  useEffect(() => {
    let unsubscribe: any;
    const fetchDataAndSetState = async () => {
      unsubscribe = await getImageCount();
    };
    fetchDataAndSetState();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  //Image Count
  const getStatData = async () => {
    const ImageQueryRef = query(collection(firestore, "files"));
    return onSnapshot(ImageQueryRef, (snapshot) => {
      let files = [];
      snapshot.docChanges().forEach((change) => {
        files = [...files, change.doc.data()];
      });
      console.log(data);
      setData({
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Images",
            data: [
              getPerMonth(0, files, "image"),
              getPerMonth(1, files, "image"),
              getPerMonth(2, files, "image"),
              getPerMonth(3, files, "image"),
              getPerMonth(4, files, "image"),
              getPerMonth(5, files, "image"),
              getPerMonth(6, files, "image"),
              getPerMonth(7, files, "image"),
              getPerMonth(8, files, "image"),
              getPerMonth(9, files, "image"),
              getPerMonth(10, files, "image"),
              getPerMonth(11, files, "image"),
            ],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Videos",
            data: [
              getPerMonth(0, files, "video"),
              getPerMonth(1, files, "video"),
              getPerMonth(2, files, "video"),
              getPerMonth(3, files, "video"),
              getPerMonth(4, files, "video"),
              getPerMonth(5, files, "video"),
              getPerMonth(6, files, "video"),
              getPerMonth(7, files, "video"),
              getPerMonth(8, files, "video"),
              getPerMonth(9, files, "video"),
              getPerMonth(10, files, "video"),
              getPerMonth(11, files, "video"),
            ],
            borderColor: "rgb(1, 90, 100)",
            backgroundColor: "rgba(1, 90, 100, 0.5)",
          },
          {
            label: "Documents",
            data: [
              getPerMonth(0, files, "application"),
              getPerMonth(1, files, "application"),
              getPerMonth(2, files, "application"),
              getPerMonth(3, files, "application"),
              getPerMonth(4, files, "application"),
              getPerMonth(5, files, "application"),
              getPerMonth(6, files, "application"),
              getPerMonth(7, files, "application"),
              getPerMonth(8, files, "application"),
              getPerMonth(9, files, "application"),
              getPerMonth(10, files, "application"),
              getPerMonth(11, files, "application"),
            ],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            label: "Audio",
            data: [
              getPerMonth(0, files, "audio"),
              getPerMonth(1, files, "audio"),
              getPerMonth(2, files, "audio"),
              getPerMonth(3, files, "audio"),
              getPerMonth(4, files, "audio"),
              getPerMonth(5, files, "audio"),
              getPerMonth(6, files, "audio"),
              getPerMonth(7, files, "audio"),
              getPerMonth(8, files, "audio"),
              getPerMonth(9, files, "audio"),
              getPerMonth(10, files, "audio"),
              getPerMonth(11, files, "audio"),
            ],
            borderColor: "rgb(40,200, 200)",
            backgroundColor: "rgba(40, 200, 200, 0.5)",
          },
        ],
      });
    });
  };

  useEffect(() => {
    let unsubscribe: any;
    const fetchDataAndSetState = async () => {
      unsubscribe = await getStatData();
    };
    fetchDataAndSetState();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  //Video Count
  const getVideoCount = async () => {
    const VideoQueryRef = query(
      collection(firestore, "files"),
      where("type", "==", "video")
    );
    return onSnapshot(VideoQueryRef, (snapshot) => {
      setVideoCount(snapshot.size);
    });
  };

  useEffect(() => {
    let unsubscribe: any;
    const fetchDataAndSetState = async () => {
      unsubscribe = await getVideoCount();
    };
    fetchDataAndSetState();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  //Document Count
  const getDocumentCount = async () => {
    const DocumentQueryRef = query(
      collection(firestore, "files"),
      where("type", "==", "application")
    );
    return onSnapshot(DocumentQueryRef, (snapshot) => {
      setDocumentCount(snapshot.size);
    });
  };

  useEffect(() => {
    let unsubscribe: any;
    const fetchDataAndSetState = async () => {
      unsubscribe = await getDocumentCount();
    };
    fetchDataAndSetState();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  //Music Count
  const getAudioCount = async () => {
    const AudioQueryRef = query(
      collection(firestore, "files"),
      where("type", "==", "audio")
    );
    return onSnapshot(AudioQueryRef, (snapshot) => {
      setAudioCount(snapshot.size);
    });
  };

  useEffect(() => {
    let unsubscribe: any;
    const fetchDataAndSetState = async () => {
      unsubscribe = await getAudioCount();
    };
    fetchDataAndSetState();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return (
    <>
      <Line options={options} data={data} width={10} height={10} />
      <>
        <div className="grid grid-rows-2 hover:gap-6 md:justify-between">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Images"
                value={imageCount}
                prefix={<PictureOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Videos"
                value={videoCount}
                prefix={<VideoCameraOutlined />}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Documents"
                value={documentCount}
                prefix={<FileTextOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Audios"
                value={audioCount}
                prefix={<SoundOutlined />}
              />
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}
export default Dashboard;

function getPerMonth(month: number, docs: any[], type: string) {
  return docs.filter(
    (s) =>
      new Date(moment.unix(s.createdAt.seconds as any) as any).getMonth() ===
        month && s.type === type
  ).length;
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
