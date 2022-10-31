import React, { useEffect, useState } from "react";
import PhotoCard from "../components/photo-card/photo-card";
import { IPhotoCard } from "../components/photo-card/photo-card.types";
import { japanAlbumConstants } from "../constants/japan.constants";
import "./pages.scss";

const Japan = () => {
  const [photos, setPhotos] = useState<IPhotoCard[]>(japanAlbumConstants);
  const [source, setSource] = useState<string>();

  useEffect(() => {
    setSource(photos[0].imageUrl);
  }, []);

  return (
    <div className="page-container">
      <div className="page-hero-image-container">
        <img src={source} alt="" className="page-hero-image" />
      </div>
      <div className="album-container">
        {photos.map((photo, index) => (
          <PhotoCard
            imageUrl={photo.imageUrl}
            key={index}
            onClick={() => setSource(photo.imageUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default Japan;
