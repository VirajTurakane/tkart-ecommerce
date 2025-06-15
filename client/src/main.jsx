import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { persist, store } from "./app/store.js";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/shared/Loader";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persist}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
