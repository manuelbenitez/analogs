import React from "react";
import "./album-preview-item.scss";

import { IAlbumPreviewItem } from "./album-preview-item.d.types";
const AlbumPreviewItem = ({ coverUrl, title, path }: IAlbumPreviewItem) => {
  return (
    <a className="album-preview-item" href={path}>
      <div className="cover-container">
        <img src={coverUrl} alt="" className="cover-image" />
      </div>
      <img className="album-title" src={title} alt="" />
    </a>
  );
};

export default AlbumPreviewItem;
