import "./home.scss";
import heroImage1 from "../assets/New Zealand/Segundo Rollo/003_2A.jpg";
import heroImage2 from "../assets/Japan/Segundo rollo/FH000034.JPG";
import heroImage3 from "../assets/Austria/Innsbruck/Colors/imm004_4.jpg";
import heroImage4 from "../assets/Spain/IMG_2492.JPG";
import heroImage5 from "../assets/Japan/Primer rollo/FH000032.JPG";
import heroImage6 from "../assets/Argentina/Segundo Rollo/000028.BMP";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-image-container">
        <img src={heroImage1} alt="" className="hero-image"></img>
        <img src={heroImage2} alt="" className="hero-image"></img>
        <img src={heroImage3} alt="" className="hero-image"></img>
        <img src={heroImage4} alt="" className="hero-image"></img>
        <img src={heroImage5} alt="" className="hero-image"></img>
        <img src={heroImage6} alt="" className="hero-image"></img>
        <div className="hero-title">Digital Scrapbook of Analog Pictures</div>
      </div>
    </div>
  );
};

export default Home;
