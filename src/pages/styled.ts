import { Grid, Paper, styled } from "@mui/material";

export const Container = styled(Grid)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  paddingTop: "90px",
}));

export const ChildContainer = styled(Grid)(({ theme }) => ({
  width: "100vw",
  height: "80vh",
}));

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  background: "none",
  boxShadow: "none",
}));
