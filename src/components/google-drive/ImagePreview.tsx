import React from "react";
import { Image } from "antd";

export interface ImagePreviewProps {
  url: string;
  name: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ url, name }) => {
  return (
    <>
      <Image width={150} height={90} src={url} title={name} />
    </>
  );
};

export default ImagePreview;
