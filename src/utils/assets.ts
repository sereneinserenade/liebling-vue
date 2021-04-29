import { State } from "@/types";
import store from "@/store";

export const getAssetUrl = (path: string): string => {
  const state: State = store.state;
  return state?.siteConfig?.API_URL + "/" + path;
};
