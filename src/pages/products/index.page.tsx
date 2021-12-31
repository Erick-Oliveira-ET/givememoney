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
import { CircularProgress } from "@mui/material";

export default function Products() {
  const [loading, setLoading] = useState(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addToCartHandle = (item: any) => {
    const res = addItem({
      id: item.id,
      name: item.name,
      description: item.description,
      quantity: 1,
      mainImageUrl: item.images[0],
    });
    if (res) console.log("Esse item já está no carrinho!!");
  };

  if (loading) {
    return (
      <Container container alignItems={"center"} justifyContent="center">
        <CircularProgress />
      </Container>
    );
  }

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
