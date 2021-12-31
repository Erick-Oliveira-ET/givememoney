import React, { useContext } from "react";
import axios from "axios";
import getStripe from "../../utils/getStripe";
import { CartContext } from "../../contexts/CartContext";
import {
  ChildContainer,
  Container,
  ImgItem,
  ItemRow,
  PayButtonRow,
} from "./styled";
import { Button, Grid, Typography } from "@mui/material";

const Cart = () => {
  const { cartDetails } = useContext(CartContext);

  const redirectToCheckout = async () => {
    let temp: any[] = [];
    if (cartDetails) {
      cartDetails.forEach(({ id, quantity }) => {
        temp.push({
          price_data: { currency: "BRL", product: id, unit_amount: 100 },
          quantity,
        });
      });
    }

    // Create axios checkout
    const checkoutRes: any = await axios.post("/api/checkout_sessions", {
      items: temp,
    }); // Internal request to the next server in the project

    const stripe = await getStripe();
    await stripe?.redirectToCheckout({ sessionId: checkoutRes.data.id });
  };

  if (!cartDetails) {
    return <h1>Nenhum produto no carrinho</h1>;
  }

  return (
    <Container container>
      <ChildContainer item>
        <Typography variant="h4" sx={{ paddingBottom: "20px" }}>
          Carrinho
        </Typography>
        {Array.from(cartDetails).map(([_, item], index) => {
          return (
            <ItemRow key={index}>
              <Grid container direction="row" alignItems="center">
                <ImgItem src={item.mainImageUrl} />
                <Grid item sx={{ paddingLeft: "20px" }}>
                  <Typography variant="h5" align="left">
                    {item.name}
                  </Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </Grid>
              </Grid>
            </ItemRow>
          );
        })}

        <PayButtonRow>
          <Button variant="contained" onClick={redirectToCheckout}>
            Pagar
          </Button>
        </PayButtonRow>
      </ChildContainer>
    </Container>
  );
};

export default Cart;
