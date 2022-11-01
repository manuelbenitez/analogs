import React, { useState } from "react";
import AlbumPreviewItem from "../album-preview-item/album-preview-item";
import japanCover from "../../assets/Japan/Segundo rollo/FH000001.JPG";
import newZealandCover from "../../assets/New Zealand/Segundo Rollo/007_7A.jpg";
import austriaCover from "../../assets/Austria/Innsbruck/Black and White/033_N32.jpg";
import argentinaCover from "../../assets/Argentina/Casamiento/Segundo Rollo/imm005_8.jpg";
import franceCover from "../../assets/France/imm000_1.jpg";
import spainCover from "../../assets/Spain/IMG_2501.JPG";
import randomCover from "../../assets/Austria/Innsbruck/Black and White/017_N17.jpg";
import aboutCover from "../../assets/New Zealand/Primer Rollo/008_8A.jpg";
import "./menu.scss";
import { albumTitlesConstants } from "../../components/album-preview-item/title.constants";

const Menu = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <>
      <div className="menu-title" onClick={() => setMenuOpen(!isMenuOpen)}>
        {"ALBUMS"}
      </div>
      <a className="menu-title-the-2nd" href="/">
        {"HOME"}
      </a>
      {isMenuOpen && (
        <div className="menu-open">
          <div className="album-list">
            <AlbumPreviewItem
              coverUrl={japanCover}
              title={albumTitlesConstants.japan}
              path="/japan"
            />
            <AlbumPreviewItem
              coverUrl={newZealandCover}
              title={albumTitlesConstants.newZealand}
              path="/new-zealand"
            />
            <AlbumPreviewItem
              coverUrl={austriaCover}
              title={albumTitlesConstants.austria}
              path="/austria"
            />
            <AlbumPreviewItem
              coverUrl={argentinaCover}
              title={albumTitlesConstants.argentina}
              path="/argentina"
            />
            <AlbumPreviewItem
              coverUrl={franceCover}
              title={albumTitlesConstants.france}
              path="/france"
            />
            <AlbumPreviewItem
              coverUrl={spainCover}
              title={albumTitlesConstants.spain}
              path="/spain"
            />
            <AlbumPreviewItem
              coverUrl={randomCover}
              title={albumTitlesConstants.random}
              path="/random"
            />
            <AlbumPreviewItem
              coverUrl={aboutCover}
              title={albumTitlesConstants.mistakes}
              path="/mistakes"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
