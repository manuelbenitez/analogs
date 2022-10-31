import "./home.scss";
import heroImage1 from "../assets/New Zealand/Segundo Rollo/003_2A.jpg";
import heroImage2 from "../assets/Japan/Segundo rollo/FH000034.JPG";
import heroImage3 from "../assets/Austria/Innsbruck/Colors/imm004_4.jpg";
import heroImage4 from "../assets/Spain/IMG_2492.JPG";

import AlbumPreviewItem from "../components/album-preview-item/album-preview-item";

import japanCover from "../assets/Japan/Segundo rollo/FH000001.JPG";
import newZealandCover from "../assets/New Zealand/Segundo Rollo/007_7A.jpg";
import austriaCover from "../assets/Austria/Innsbruck/Black and White/033_N32.jpg";
import argentinaCover from "../assets/Argentina/Casamiento/Segundo Rollo/imm005_8.jpg";
import franceCover from "../assets/France/imm000_1.jpg";
import spainCover from "../assets/Spain/IMG_2501.JPG";
import { albumTitlesConstants } from "../components/album-preview-item/title.constants";
const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-image-container">
        <img src={heroImage1} alt="" className="hero-image"></img>
        <img src={heroImage2} alt="" className="hero-image"></img>
        <img src={heroImage3} alt="" className="hero-image"></img>
        <img src={heroImage4} alt="" className="hero-image"></img>
        <div className="hero-title">Digital Scrapbook of Analog Pictures</div>
      </div>

      <div className="album-preview-container">
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
          coverUrl={""}
          title={albumTitlesConstants.random}
          path="/random"
        />
        <AlbumPreviewItem
          coverUrl={""}
          title={albumTitlesConstants.mistakes}
          path="/mistakes"
        />
      </div>
    </div>
  );
};

export default Home;
