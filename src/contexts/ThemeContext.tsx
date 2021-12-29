import { createContext, ReactNode, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { createTheme, Paper } from "@mui/material";
import { orange } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

interface ThemeContextData {
  toggleColorMode: any;
}

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextData);

export function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const toggleColorMode = useMemo(
    () => ({
      onCLick: () => {
        setMode(mode === "light" ? "dark" : "light");
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
        status: {
          danger: orange[500],
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
