import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Container } from "./styled";
import { CartContext } from "@/contexts/CartContext";

export default function Products() {
  const { t } = useTranslation("common");
  const [productsList, setProductsList] = useState<any>();
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    axios
      .post("/api/allProducts")
      .then((data) => {
        console.log(data);
        setProductsList(data?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const addToCartHandle = (item: any) => {
    const res = addItem({ id: item.id, name: item.name, quantity: 1 });
    if (res) console.log("Esse item já está no carrinho!!");
  };

  return (
    <Container container justifyContent="center">
      {productsList ? (
        productsList.map((item: any, index: number) => (
          <Grid item key={index} sx={{ maxWidth: "500px" }}>
            <Card sx={{ margin: "5px", borderRadius: "10px" }}>
              <CardMedia component="img" image={item.images[0]} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="large" onClick={() => addToCartHandle(item)}>
                  Add Carrinho
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <h1>Nenhum Produto disponível</h1>
      )}
    </Container>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
