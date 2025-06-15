import Loader from "@/components/shared/Loader";
import {
  selectWishlist,
  selectWishlistLoading,
} from "@/features/wishlist/selector";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/shared/ProductCard";

const Wishlist = () => {
  const wishlist = useSelector(selectWishlist);
  const loading = useSelector(selectWishlistLoading);

  if (loading) return <Loader />;
  return (
    <div>
      <div className="p-[3%] sm:p[4%] md:p[5%] flex flex-col gap-4">
        {wishlist?.map((element) => {
          return <ProductCard key={element.product._id} product={element.product} isAddedToWishlist={true} />
        })}
      </div>
    </div>
  );
};

export default Wishlist;
