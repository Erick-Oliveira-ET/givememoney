import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";

const Success = () => {
  const {
    query: { session_id },
  } = useRouter();
  const [error, setError] = useState();
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`api/checkout_sessions/${session_id}`)
      .then((res) => {
        console.log("Deu certo");
        console.log(res);
        setError(undefined);
        if (res) clearCart();
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [clearCart]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {error ? <h1>Falha na Transação</h1> : <h1>Parabéns pela Compra</h1>}
    </div>
  );
};

export default Success;
