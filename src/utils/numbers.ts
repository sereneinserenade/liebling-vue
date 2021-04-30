import { round } from "mathjs";

export const roundOff = (num: number, places = 2): number => {
  return round(num, places);
};
