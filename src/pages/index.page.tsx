import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";

export default function Home() {
  const { t } = useTranslation("common");

  return <Grid container></Grid>;
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
