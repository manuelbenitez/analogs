import React, { useState } from "react";
import Icon from "../icon/icon";
import { MdSwitchCamera } from "react-icons/md";
import "./menu.scss";
const Menu = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <>
      <div className="icon-container" onClick={() => setMenuOpen(!isMenuOpen)}>
        <Icon icon={<MdSwitchCamera />} />
      </div>
      {isMenuOpen && (
        <div className="menu-open" onClick={() => setMenuOpen(!isMenuOpen)}>
          <div className="album-list">
            <a href="/" className="album-item">
              Home
            </a>
            <a href="/japan" className="album-item">
              Japan
            </a>
            <a href="/austria" className="album-item">
              Austria
            </a>
            <a href="/new-zealand" className="album-item">
              New Zealand
            </a>
            <a href="/spain" className="album-item">
              Spain
            </a>
            <a href="/random" className="album-item">
              Random
            </a>
            <a href="/argentina" className="album-item">
              Argentina
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
