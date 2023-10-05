import React from "react";
import { Button } from "antd";
import docicon from "../../assets/doc.png";
export interface DocumentPreviewProps {
  url: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ url }) => {
  const openInNewTab = () => {
    window.open(url, "_blank");
  };

  return (
    <>
      <img src={docicon} width={50} height={50} onClick={openInNewTab} />
    </>
  );
};

export default DocumentPreview;
