import { Grid, styled } from "@mui/material";

export const Container = styled(Grid)(({ theme }) => ({
  width: "100vw",
  height: "calc(100vh - 88px)",
  background: theme.palette.action.disabledBackground,
}));
