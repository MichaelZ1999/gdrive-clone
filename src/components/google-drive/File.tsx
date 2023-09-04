import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FileIcon from '../fileicon.png'
import React from 'react'

interface FileProps {
  file: {
    url: string;
    name: string;
  };
}


export default function File({ file }: FileProps) {
  return (
    <a 
    href={file.url} 
    target='_blank' 
    className='text-truncate w-100 flex-1 flex-row'
    >
        <img src={FileIcon} className="mr-2 h-10 w-10"/>
        {file.name}
    </a>
  )
}
