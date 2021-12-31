import { PaletteMode } from "@mui/material";
import { THEME_MODE_UPDATE } from "..";

export const themeModeUpdate = (themeMode: PaletteMode) => {
  return {
    type: THEME_MODE_UPDATE,
    payload: themeMode,
  };
};
