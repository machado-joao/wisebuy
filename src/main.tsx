import { createRoot } from "react-dom/client";
import { setupInterceptors } from "./api/index.ts";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

setupInterceptors();

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <App />
  </AuthProvider>
);
