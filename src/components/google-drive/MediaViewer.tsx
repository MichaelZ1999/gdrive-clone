import React, { useState } from 'react';
import Folder from './Folder';
import File from './File';



interface MediaViewerProps {
    mediaType: string;
    mediaUrl: string;
    onClose: () => void;
  }
  
export default function MediaViewer({ mediaType, mediaUrl, onClose }: MediaViewerProps): JSX.Element {
    if (mediaType === 'video') {
        return (
          <div>
            <video src={mediaUrl} controls width="100%" height="auto" />
            <button onClick={onClose}>Close</button>
          </div>
        );
      } else if (mediaType === 'image') {
        return (
          <div>
            <img src={mediaUrl} alt="Image" style={{ maxWidth: '100%' }} />
            <button onClick={onClose}>Close</button>
          </div>
        );
      } else {
        return null;
      }
  };