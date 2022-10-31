import React from "react";
import "./album-preview-item.scss";

import { IAlbumPreviewItem } from "./album-preview-item.d.types";
const AlbumPreviewItem = ({ coverUrl, title, onClick }: IAlbumPreviewItem) => {
  return (
    <div className="album-preview-item">
      <div className="cover-container">
        <img src={coverUrl} alt="" className="cover-image" />
      </div>
      <img className="album-title" src={title} alt="" />
    </div>
  );
};

export default AlbumPreviewItem;
