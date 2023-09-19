import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

interface Folder {
  name: string;
  id: string | null;
  path?: Folder[];
}

interface BreadcrumbItem {
  text: string | ReactNode;
  link: string;
}

interface FolderBreadcrumbsProps {
  currentFolder: Folder | null; // Updated the type to allow null values
}

export default function FolderBreadcrumbs({ currentFolder }: FolderBreadcrumbsProps): JSX.Element {
  let breadcrumbItems: BreadcrumbItem[] = [
    {
      text: <HomeOutlined />,
      link: '/',
    },
  ];

  if (currentFolder && currentFolder.path) {
    breadcrumbItems = [
      ...breadcrumbItems,
      ...currentFolder.path.map((folder) => ({
        text: folder.name,
        link: `/home/folder/${folder.id}`,
      })),
    ];
  }

  if (currentFolder && currentFolder.name) {
    breadcrumbItems.push({
      text: currentFolder.name,
      link: `/home/folder/${currentFolder.id}`,
    });
  }

  const parentFolderIndex = currentFolder
    ? breadcrumbItems.findIndex(
        (item) => item.text === currentFolder.name && item.link === `/folder/${currentFolder.id}`
      )
    : -1; // Added a fallback value for null currentFolder

  if (parentFolderIndex !== -1) {
    breadcrumbItems = breadcrumbItems.slice(0, parentFolderIndex + 1);
  }

  return (
    <Breadcrumb separator=">">
      {breadcrumbItems.slice(-4).map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.link ? <Link to={item.link}>{item.text}</Link> : item.text}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
//Old Breadcrumb
{/* <Breadcrumb className="custom-breadcrumb">
    <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"/>
    </svg>
      {breadcrumbItems.slice(-4).map((item, index) => ( 
        <Breadcrumb.Item key={item.text} className={index === breadcrumbItems.length - 1 ? 'current' : ''}>
          {item.link ? <Link to={item.link}>{item.text}</Link> : item.text}
        </Breadcrumb.Item>
      ))}
</Breadcrumb> */}