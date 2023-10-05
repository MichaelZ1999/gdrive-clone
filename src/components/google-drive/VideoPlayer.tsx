import React, { useState } from "react";
import { Button, Modal } from "antd";
import videoicon from "../../assets/video.png";
export interface VideoPlayerProps {
  url: string;
  name: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, name }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        src={videoicon}
        width={50}
        height={50}
        onClick={() => setOpen(true)}
      />

      <Modal
        title={name}
        centered
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        destroyOnClose
        width={500}
        footer={null}
      >
        <video controls>
          <source src={url} />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </>
  );
};

export default VideoPlayer;
