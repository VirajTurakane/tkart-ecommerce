import Loader from "@/components/shared/Loader";
import {
  selectWishlist,
  selectWishlistLoading,
} from "@/features/wishlist/selector";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/shared/ProductCard";
import Header from "@/components/shared/Header";
import Empty from "@/components/shared/Empty";

const Wishlist = () => {
  const wishlist = useSelector(selectWishlist);
  const loading = useSelector(selectWishlistLoading);

  if (loading) return <Loader />;
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <Header title={"Wishlist"} />
      {wishlist?.length === 0 ? (
        <Empty message={"Wishlist is empty."} />
      ) : (
        <div className="px-[3%] sm:px-[4%] md:px-[5%] flex flex-col gap-4">
          {wishlist?.map((element) => {
            return (
              <ProductCard
                key={element.product._id}
                product={element.product}
                isAddedToWishlist={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
