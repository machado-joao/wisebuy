import { createRoot } from "react-dom/client";
import { setupInterceptors } from "./api/index.ts";
import CartProvider from "./contexts/CartContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "./index.css";
import App from "./App.tsx";

setupInterceptors();

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);
