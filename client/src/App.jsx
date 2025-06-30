import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuth } from "./features/auth/authSlice";
import { fetchProducts } from "./features/product/thunks.js";
import Loader from "./components/shared/Loader";
import Navbar from "./components/shared/Navbar";
import AppRoutes from "./AppRoutes";
import Footer from "./components/shared/Footer";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.loading);
  const productStatus = useSelector((state) => state.product.loading);

  useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (authStatus || productStatus) return <Loader />;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />
      <main className="flex-grow pb-40">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
