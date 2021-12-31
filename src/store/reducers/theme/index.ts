import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { THEME_MODE_UPDATE, THEME_UPDATE } from "store/actions";
import { createTheme, PaletteMode, Theme } from "@mui/material";
import { getDesignTokens } from "@/styles/theme";

export interface ThemeState {
  themeMode: PaletteMode;
  theme: Theme;
}

const initialState: ThemeState = {
  themeMode: "dark",
  theme: createTheme(getDesignTokens("dark")),
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.theme };
    case THEME_MODE_UPDATE:
      return {
        ...state,
        themeMode: action.payload,
        theme: createTheme(getDesignTokens(action.payload)),
      };
    default:
      return state;
  }
};

export default reducer;
