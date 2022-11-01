import "./album-preview-item.scss";
import { motion } from "framer-motion";
import { IAlbumPreviewItem } from "./album-preview-item.d.types";

const AlbumPreviewItem = ({ coverUrl, title, path }: IAlbumPreviewItem) => {
  return (
    <motion.a
      whileHover={{ scale: 1.01 }}
      className="album-preview-item"
      href={path}
    >
      <motion.div
        style={{
          filter: "grayscale(100%)",
          opacity: 0.2,
          backgroundColor: "rgba(230, 230, 230, 0.658)",
        }}
        animate={{ filter: "grayscale(0%)", opacity: 1 }}
        transition={{ duration: 3 }}
        className="cover-container"
      >
        <img src={coverUrl} alt="" className="cover-image" />
      </motion.div>
      <motion.img
        style={{ filter: "grayscale(100%)", opacity: 0 }}
        animate={{ filter: "grayscale(0%)", opacity: 1 }}
        transition={{ duration: 3 }}
        className="album-title"
        src={title}
        alt=""
      />
    </motion.a>
  );
};

export default AlbumPreviewItem;
