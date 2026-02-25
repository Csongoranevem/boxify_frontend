import { Box } from "./box";

export interface Item {
  id: string;
  userId: string;
  boxId: string;
  selectedBox?: Box;
  name: string;
  description: string;
  category: string;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightKg: number;
  imagePath: string;
}
