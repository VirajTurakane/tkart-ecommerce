import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import Order from "./pages/Order";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<Signup />} path="/signup" />
      <Route
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
        path="/orders"
      />
      <Route
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
        path="/wishlist"
      />
      <Route
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
        path="/cart"
      />
      <Route element={<Product />} path="/product/:id" />
      <Route element={<Order />} path="/order/:id" />

      <Route element={<NotFound />} path="*" />
    </Routes>
  );
};

export default AppRoutes;
