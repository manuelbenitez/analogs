import React, { useState } from "react";
import Modal from "../components/modal/modal";
import PhotoCard from "../components/photo-card/photo-card";
import { IPhotoCard } from "../components/photo-card/photo-card.types";
import { japanAlbumConstants } from "../constants/japan.constants";
import "./pages.scss";

const Japan = () => {
  const [photos, setPhotos] = useState<IPhotoCard[]>(japanAlbumConstants);
  const [isModalOpen, setModalOpen] = useState<boolean>();
  const [modalImage, setModalImage] = useState<string>("");
  const [vertical, setVertical] = useState<boolean | undefined>(false);
  const handleModal = (imageUrl: string, vertical: boolean | undefined) => {
    setModalImage(imageUrl);
    setVertical(vertical);
    setModalOpen(true);
  };
  return (
    <div className="album-container">
      {photos.map((photo, index) => (
        <PhotoCard
          imageUrl={photo.imageUrl}
          key={index}
          onClick={() => handleModal(photo.imageUrl, photo.vertical)}
        />
      ))}
      {isModalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          imageUrl={modalImage}
          vertical={vertical}
        />
      )}
    </div>
  );
};

export default Japan;
