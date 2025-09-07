import { createRoot } from "react-dom/client";
import "./index.css";
import CartProvider from "./contexts/CartContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <App />
  </CartProvider>
);
