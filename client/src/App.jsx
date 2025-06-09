import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuth } from "./features/auth/authSlice";
import { fetchProducts } from "./features/product/productSlice";
import Loader from "./components/shared/Loader";
import Navbar from "./components/shared/Navbar";
import AppRoutes from "./AppRoutes";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.loading);
  const productStatus = useSelector((state) => state.product.loading);

  useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("App.jsx Rerendered");
  if (authStatus || productStatus) return <Loader />;

  return (
    <div className="flex flex-col w-screen h-screen">
      {authStatus && <Loader />}
      {productStatus && <Loader />}
      <Navbar />

      <AppRoutes />
    </div>
  );
}

export default App;
