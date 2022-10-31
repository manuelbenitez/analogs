import React, { useState } from "react";
import "./menu.scss";
const Menu = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <>
      <div className="menu-title" onClick={() => setMenuOpen(!isMenuOpen)}>
        {"MENU"}
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
