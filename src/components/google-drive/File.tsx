 import React , { useState }from 'react'
import { Button } from 'antd';
import { firestore } from '../../firebase';
import { updateDoc, doc } from 'firebase/firestore';

export interface FileProps {
  file: {
    url: string;
    name: string;
    type: string;
    id: any;
  };
 
}


export default function File({ file }: FileProps): JSX.Element {
  
  const truncatedName = file.name.length > 10 ? `${file.name.slice(0, 10)}...` : file.name;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTrash, setIsTrash] = useState(false);
  
  const toggleFavorite = async () => {
    try {
      await 
       
      updateDoc(doc(firestore, 'files', file.id), { isFavorite: !isFavorite });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log("Error updating file:", error);
    }
  };

  const toggleTrash = async () => {
    try {
      await 
       
      updateDoc(doc(firestore, 'files', file.id), { isTrash: !isTrash });
      setIsTrash(!isTrash);
    } catch (error) {
      console.log("Error deleting file:", error);
    }
  };
  const handleOptionSelected = (option) => {
    // Handle the selected option based on your requirements
    console.log(`Selected option: ${option}`);
  };
  
  return (
  <>
    <img
    src={file.url}
      className='text-truncate w-100 flex-1 flex-row'
      style={{height: 'auto'}}
     />
     {truncatedName}
     {/* <OptionsMenu onOptionSelected={handleOptionSelected} /> */}

    <Button onClick={toggleFavorite}>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</Button>
    <Button onClick={toggleTrash}>{isTrash ? 'Remove from trash' : 'Trash'}</Button>
    {/* <OptionsMenu onOptionSelected={handleOptionSelected} /> */}
  </>
  )
}


{/* <Button onClick={() => openMedia(file.type, file.url)}>
      {file.type === 'video' && <span>Play Video</span>}
      {file.type === 'image' && <span>Open Image</span>}
      {truncatedName}
    </Button> */}

// import OptionsMenu from './OptionsMenu';
// import FileIcon from '../../assets/fileicon.png'

