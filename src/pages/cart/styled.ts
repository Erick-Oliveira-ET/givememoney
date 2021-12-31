import { Grid, Paper, styled } from "@mui/material";

export const Container = styled(Grid)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  paddingTop: "90px",
}));

export const ChildContainer = styled(Grid)(({ theme }) => ({
  padding: "40px 40px 0 40px",
  width: "100%",
}));

export const ItemRow = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  borderRadius: "15px",
}));

export const PayButtonRow = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "end",
  boxShadow: "none",
  background: "none",
}));

export const ImgItem = styled("img")({
  aspectRatio: "1",
  width: "80px",
  borderRadius: "15px",
});
