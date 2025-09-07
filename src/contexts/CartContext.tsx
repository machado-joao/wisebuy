import { createContext, type ReactNode, useState, useEffect } from "react";
import type { Item } from "../interfaces/Item";

interface CartContext {
  items: Item[];
  addItem: (name: string, quantity: number, price: number) => void;
  toggleInCart: (id: number) => void;
  removeItem: (id: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContext | undefined>(undefined);
const LOCAL_STORAGE_KEY = "wisebuy";

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (name: string, quantity: number, price: number) => {
    const newItem: Item = {
      id: Date.now(),
      name: name,
      quantity: quantity,
      price: price,
      inCart: false,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const toggleInCart = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inCart: !item.inCart } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ items, addItem, toggleInCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
