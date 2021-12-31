import React, { useContext } from "react";
import axios from "axios";
import getStripe from "../../utils/getStripe";
import { CartContext } from "../../contexts/CartContext";

const Cart = () => {
  const { cartDetails } = useContext(CartContext);

  const redirectToCheckout = async () => {
    console.log("cartDetails", cartDetails);

    let temp: any[] = [];
    if (cartDetails) {
      cartDetails.forEach(({ id, quantity }) => {
        temp.push({ price_data: { currency: "BRL", product: id }, quantity });
      });
    }

    console.log("temp", temp);
    // Create axios checkout
    const { data: id } = await axios.post("/api/checkout_sessions", {
      items: temp,
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
