import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";

interface CartContextData {
  cartDetails?: Map<string, CartProduct>;
  cartQuantity?: number;
  clearCart: () => void;
  addItem: (item: CartProduct) => boolean | undefined | void;
}

interface CartProviderProps {
  children: ReactNode;
}

export interface CartProduct {
  id: string;
  name: string;
  quantity: number;
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const [cartDetails, setCartDetails] = useState<Map<string, CartProduct>>();
  const [cartQuantity, setCartQuantity] = useState<number>();

  useEffect(() => {
    setCartQuantity(cartDetails?.size);
    console.log(cartDetails?.size);
  }, [cartDetails]);

  const clearCart = () => {
    setCartDetails(undefined);
  };

  const addItem = (item: CartProduct) => {
    let temp: Map<string, CartProduct> = new Map();
    if (!cartDetails) {
      temp.set(item.id, item);
      setCartDetails(temp);
      return;
    }

    if (!cartDetails.has(item.id)) {
      temp = cartDetails;
      temp?.set(item.id, item);
      setCartDetails(temp);
      return;
    }

    return true; // Avisando que ja existe o item no carrinho
  };

  return (
    <CartContext.Provider
      value={{ cartDetails, clearCart, cartQuantity, addItem }}
    >
      {children}
    </CartContext.Provider>
  );
}
