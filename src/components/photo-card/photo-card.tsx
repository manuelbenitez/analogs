import { motion } from "framer-motion";
import React from "react";
import "./photo-card.scss";
import { IPhotoCard } from "./photo-card.types";
const PhotoCard = ({ imageUrl, onClick, opacityDelay }: IPhotoCard) => {
  return (
    <div className={`card-container`} onClick={onClick}>
      <motion.img
        style={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: opacityDelay }}
        src={imageUrl}
        alt=""
        className={`photo`}
      />
    </div>
  );
};

export default PhotoCard;
