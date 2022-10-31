import argentina from "../../assets/album-titles/argentina.png";
import austria from "../../assets/album-titles/austria.png";
import france from "../../assets/album-titles/france.png";
import espana from "../../assets/album-titles/espana.png";
import newZealand from "../../assets/album-titles/new zealand.png";
import japan from "../../assets/album-titles/japan.png";
import mistakes from "../../assets/album-titles/mistakes2.png";
import random from "../../assets/album-titles/random.png";

export const albumTitlesConstants: IAlbumTitles = {
  argentina: argentina,
  japan: japan,
  newZealand: newZealand,
  austria: austria,
  france: france,
  spain: espana,
  random: random,
  mistakes: mistakes,
};
interface IAlbumTitles {
  argentina: string;
  japan: string;
  newZealand: string;
  austria: string;
  france: string;
  spain: string;
  random: string;
  mistakes: string;
}
