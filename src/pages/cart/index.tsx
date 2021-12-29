import React, { useContext } from "react";
import axios from "axios";
import getStripe from "../../utils/getStripe";
import { CartContext } from "../../contexts/CartContext";

const Cart = () => {
  const { cartDetails } = useContext(CartContext);

  const redirectToCheckout = async () => {
    // Create axios checkout
    const { data: id } = await axios.post("/api/checkout_sessions", {
      items: Object.entries(cartDetails as any).map(
        ([_, { id, quantity }]: any) => ({
          price: id,
          quantity,
        })
      ),
    }); // Internal request to the next server in the project

    const stripe = await getStripe();
    await stripe?.redirectToCheckout({ sessionId: id });
  };

  return (
    <div>
      <h1>Hello Cart</h1>
      <button onClick={redirectToCheckout}>Pagar</button>
    </div>
  );
};

export default Cart;
