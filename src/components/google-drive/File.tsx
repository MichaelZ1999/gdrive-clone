import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FileIcon from '../../assets/fileicon.png'
import React from 'react'
import { Button } from 'antd';

interface FileProps {
  file: {
    url: string;
    name: string;
    type: string;
  };
 
}


export default function File({ file }: FileProps): JSX.Element {
  
  const truncatedName = file.name.length > 10 ? `${file.name.slice(0, 10)}...` : file.name;
  
  return (
  <>
    <img
    src={file.url}
      className='text-truncate w-100 flex-1 flex-row'
      style={{height: 'auto'}}
     />
    {/* <Button onClick={() => openMedia(file.type, file.url)}>
      {file.type === 'video' && <span>Play Video</span>}
      {file.type === 'image' && <span>Open Image</span>}
      {truncatedName}
    </Button> */}
  </>
  )
}





