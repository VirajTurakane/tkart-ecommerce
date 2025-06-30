import Empty from "@/components/shared/Empty";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Loader from "@/components/shared/Loader";
import ProductCard from "@/components/shared/ProductCard";
import { fetchCart } from "@/features/cart/thunks";
import { selectWishlist } from "@/features/wishlist/selector";
import { isAddedToWishlist } from "@/utils/helper/wishlist";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();

  const { cart, loading } = useSelector((state) => state.cart);
  const wishlist = useSelector(selectWishlist);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      <Header title={"Cart"} />
      {cart?.length === 0 ? (
        <Empty message={"Cart is empty."} />
      ) : (
        <div className="px-[3%] sm:px-[4%] md:px-[5%] flex flex-col gap-4">
          {cart?.map((product) => {
            return (
              <ProductCard
                key={product._id}
                isAddedToWishlist={isAddedToWishlist(wishlist, product)}
                product={product}
                remove={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
