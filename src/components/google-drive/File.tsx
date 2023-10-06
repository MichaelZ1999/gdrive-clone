import React, { useState } from "react";
import { Button } from "antd";
import { firestore } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import OptionsMenu from "./OptionsMenu";
import VideoPlayer from "./VideoPlayer";
import ImagePreview from "./ImagePreview";
import DocumentPreview from "./DocumentPreview";
import MusicPlayer from "./MusicPlayer";

export interface FileProps {
  file: {
    url: string;
    name: string;
    type: string;
    id: any;
  };
}

export default function File({ file }: FileProps): JSX.Element {
  const truncatedName =
    file.name.length > 10 ? `${file.name.slice(0, 10)}...` : file.name;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTrash, setIsTrash] = useState(false);

  const handleOptionSelected = (option: string) => {
    switch (option) {
      case "addToFavorites":
        try {
          updateDoc(doc(firestore, "files", file.id), {
            isFavorite: !isFavorite,
          });
          setIsFavorite(!isFavorite);
        } catch (error) {
          console.log("Error updating file:", error);
        }
        break;
      case "delete":
        try {
          updateDoc(doc(firestore, "files", file.id), { isTrash: !isTrash });
          setIsTrash(!isTrash);
        } catch (error) {
          console.log("Error deleting file:", error);
        }
        break;
      default:
        break;
    }
    // Handle the selected option based on your requirements
    console.log(`Selected option: ${option}`);
  };

  const renderFileComponent = () => {
    if (file.type?.includes("video")) {
      return <VideoPlayer url={file.url} name={file.name} />;
    } else if (file.type?.includes("image")) {
      return <ImagePreview url={file.url} name={file.name} />;
    } else if (file.type?.includes("application")) {
      return <DocumentPreview url={file.url} />;
    } else if (file.type?.includes("audio")) {
      return <MusicPlayer url={file.url} name={file.name} />;
    }
  };
  // switch (file.type) {
  //   case 'video/mp4':
  //     return <VideoPlayer url={file.url} />;
  //   case 'image':
  //     return <ImagePreview url={file.url} />;
  //   case 'document':
  //     return <DocumentPreview url={file.url} />;
  //   case 'audio/mpeg':
  //     return <MusicPlayer url={file.url} />;
  //   case 'audio/x-m4a':
  //     return <MusicPlayer url={file.url} />;

  //   default:
  //     return null;
  // }

  return (
    <>
      <div className="flex flex-col">
        {truncatedName} {renderFileComponent()}{" "}
        <OptionsMenu onOptionSelected={handleOptionSelected} />
      </div>
    </>
  );
}

{
  /* <Button onClick={toggleFavorite}>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</Button>
    <Button onClick={toggleTrash}>{isTrash ? 'Remove from trash' : 'Trash'}</Button> */
}
{
  /* <OptionsMenu onOptionSelected={handleOptionSelected} /> */
}

{
  /* <Button onClick={() => openMedia(file.type, file.url)}>
      {file.type === 'video' && <span>Play Video</span>}
      {file.type === 'image' && <span>Open Image</span>}
      {truncatedName}
    </Button> */
}

// import OptionsMenu from './OptionsMenu';
// import FileIcon from '../../assets/fileicon.png'

// <>
//     <img
//     src={file.url}
//       className='text-truncate w-100 flex-1 flex-row'
//       style={{height: 'auto'}}
//      />
//      {truncatedName}
//      <OptionsMenu onOptionSelected={handleOptionSelected} />
// </>
