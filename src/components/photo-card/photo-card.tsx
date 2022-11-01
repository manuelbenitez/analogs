import React from "react";
import "./photo-card.scss";
import { IPhotoCard } from "./photo-card.types";
const PhotoCard = ({ imageUrl, onClick, vertical }: IPhotoCard) => {
  return (
    <div className={`card-container`} onClick={onClick}>
      <img src={imageUrl} alt="" className={`photo`} />
    </div>
  );
};

export default PhotoCard;
