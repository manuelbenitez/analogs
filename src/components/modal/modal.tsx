import React from "react";
import "./modal.scss";
import { IModalProps } from "./modal.types";
const Modal = ({ imageUrl, vertical, onClose }: IModalProps) => {
  return (
    <div className="modal-container">
      <img
        src={imageUrl}
        alt=""
        className={`modal-image ${vertical && "vertical"}`}
      />
      <div className="backdrop" onClick={onClose} />
    </div>
  );
};

export default Modal;
