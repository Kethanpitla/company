import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/globals.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    <UserProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </UserProvider>
  
)
