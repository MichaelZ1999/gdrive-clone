import React, { useState } from "react";
import { Button, Modal } from "antd";
import musicicon from "../../assets/music.png";
export interface MusicPlayerProps {
  url: string;
  name: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ url, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={musicicon}
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
        width={350}
        footer={null}
      >
        <audio controls>
          <source src={url} />
          Your browser does not support the audio tag.
        </audio>
      </Modal>
    </>
  );
};

export default MusicPlayer;
