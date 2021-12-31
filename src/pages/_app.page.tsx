import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { CartProvider } from "../contexts/CartContext";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { CustomThemeProvider } from "@/contexts/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";
import { wrapper } from "store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>💸Give❤Erick❤Money💸</title>
      </Head>
      <CustomThemeProvider>
        <CssBaseline />
        <CartProvider>
          <NavBar />
          <main>
            <Component {...pageProps} />
          </main>
        </CartProvider>
      </CustomThemeProvider>
    </>
  );
}
export default MyApp;
