import FileIcon from '../../assets/fileicon.png'
import React from 'react'
import { Button } from 'antd';
import OptionsMenu from './OptionsMenu';
import { addFileToFavorites } from './AddToFavorites';

interface FileProps {
  file: {
    url: string;
    name: string;
    type: string;
  };
 
}


export default function File({ file }: FileProps): JSX.Element {
  
  const truncatedName = file.name.length > 10 ? `${file.name.slice(0, 10)}...` : file.name;
  function handleOptionSelected(option: string) {
    if (option === "add-to-favorites") {
      addFileToFavorites(file); // Assuming you have an API function to add files to favorites
  } else {
    // Handle other options...
  }
}
  return (
  <>
    <img
    src={file.url}
      className='text-truncate w-100 flex-1 flex-row'
      style={{height: 'auto'}}
     />      
     {truncatedName}
     <OptionsMenu onOptionSelected={handleOptionSelected} />
    
  </>
  )
}




{/* <Button onClick={() => openMedia(file.type, file.url)}>
      {file.type === 'video' && <span>Play Video</span>}
      {file.type === 'image' && <span>Open Image</span>}
      {truncatedName}
    </Button> */}
