import { darkBlue } from "@/constants/colorConstants";
import {
  addedToWishlist,
  removedFromWishlist,
} from "@/constants/textConstants";
import { selectWishlist } from "@/features/wishlist/selector";
import { addToWishlist, removeFromWishlist } from "@/features/wishlist/thunks";
import { ArrowDown, Heart } from "iconsax-reactjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Card = ({
  id,
  thumbnail,
  name,
  price,
  discount,
  icon,
  isAddedToWishlist,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const navigateHandler = () => {
    navigate(`/product/${id}`);
  };

  const addToWishlistHandler = (productId) => {
    dispatch(addToWishlist(productId));
    toast.success(addedToWishlist);
  };

  const removeFromWishlistHandler = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success(removedFromWishlist);
  };

  return (
    <div className="relative w-auto transition-all duration-300 ease-linear shadow-xl rounded-xl hover:scale-105">
      <div
        className="absolute cursor-pointer top-1 right-1"
        onClick={() => {
          if (!isAddedToWishlist) {
            addToWishlistHandler(id);
          } else {
            removeFromWishlistHandler(id);
          }
        }}
      >
        <Heart
          size={32}
          color={isAddedToWishlist ? "#ff0000" : darkBlue}
          variant={isAddedToWishlist ? "Bold" : "Linear"}
        />
      </div>
      <div onClick={navigateHandler}>
        <div className="rounded">
          <img
            src={thumbnail}
            alt="image"
            className="rounded-tr-xl rounded-tl-xl"
          />
        </div>
        <div className="relative px-2 py-4 hover:bg-gray-200 rounded-b-xl">
          <div className="text-lg font-medium text-primary-200">{name}</div>
          <div className="font-medium text-primary-200">${price}</div>
          {discount > 0 && (
            <div className="flex items-center">
              <ArrowDown size={16} color={darkBlue} />
              <span className="font-medium text-primary-200">{discount} %</span>
            </div>
          )}
          <div className="absolute bottom-0 right-0 p-2 bg-primary-200 rounded-br-xl rounded-tl-xl">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
