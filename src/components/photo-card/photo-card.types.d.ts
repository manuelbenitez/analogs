import { NumericLiteral } from "typescript";

export interface IPhotoCard {
  imageUrl: string;
  vertical?: boolean;
  opacityDelay?: number;
  onClick?: () => void;
}
