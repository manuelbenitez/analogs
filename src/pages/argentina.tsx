import React, { useCallback, useEffect, useState } from "react";
import PhotoCard from "../components/photo-card/photo-card";
import { IPhotoCard } from "../components/photo-card/photo-card.types";
import { argentinaConstants } from "../constants/argentina.constants";
import "./pages.scss";

const Argentina = () => {
  const [photos, setPhotos] = useState<IPhotoCard[]>([]);
  const [source, setSource] = useState<string>();

  const fetchPhotos = useCallback(async () => {
    setTimeout(() => {
      setPhotos(argentinaConstants);
    }, 100);
    setTimeout(() => {
      setSource(photos[0]?.imageUrl);
    }, 0);
  }, [photos]);

  useEffect(() => {
    fetchPhotos();
  }, [photos]);

  return (
    <div className="page-container">
      <div className="page-hero-image-container">
        {source && <img src={source} alt="" className="page-hero-image" />}
      </div>
      <div className="album-container">
        {photos &&
          photos.map((photo, index) => (
            <PhotoCard
              imageUrl={photo.imageUrl}
              key={index}
              opacityDelay={index / 5 - 0.8}
              onClick={() => setSource(photo.imageUrl)}
            />
          ))}
      </div>
    </div>
  );
};

export default Argentina;
