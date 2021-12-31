import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Container } from "./styled";

const Success = () => {
  const {
    query: { session_id },
  } = useRouter();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`api/checkout_sessions/${session_id}`)
      .then((res) => {
        setError(undefined);
        if (res) clearCart();
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [clearCart, session_id]);

  if (loading) {
    return (
      <Container container alignItems="center" justifyContent={"center"}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container container alignItems="center" justifyContent={"center"}>
      <Typography variant="h1" sx={{ color: "yellow" }} align="center">
        Muito obrigado pelo apoio!! Fico muito feliz!!! 😁
      </Typography>
    </Container>
  );
};

export default Success;
