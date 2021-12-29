import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { CartProvider } from "../contexts/CartContext";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { CustomThemeProvider } from "@/contexts/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <CartProvider>
        <Head>
          <title>💸Give❤Erick❤Money💸</title>
        </Head>
        <NavBar />
        <Component {...pageProps} />
      </CartProvider>
    </CustomThemeProvider>
  );
}
export default appWithTranslation(MyApp);
