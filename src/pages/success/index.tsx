import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import useSWR from "swr";
import { CartContext } from "../../contexts/CartContext";
import fetcher from "../../utils/fetcher";

const Success = () => {
  const {
    query: { session_id },
  } = useRouter();

  const { clearCart } = useContext(CartContext);

  const { data, error } = useSWR(
    () => `api/checkout_sessions/${session_id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      clearCart();
    }
  }, [data]);

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
