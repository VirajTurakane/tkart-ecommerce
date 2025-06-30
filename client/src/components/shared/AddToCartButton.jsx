import React from "react";
import TButton from "./TButton";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/thunks";
import { toast } from "sonner";
import { addedToCart } from "@/constants/textConstants";
import { ShoppingCart } from "iconsax-reactjs";
import { darkBlue } from "@/constants/colorConstants";

const AddToCartButton = ({ productId }) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart(productId));
    toast.success(addedToCart);
  };
  return (
    <TButton
      icon={<ShoppingCart size={22} color={darkBlue} />}
      text={"Add To Cart"}
      outlined={true}
      onClick={addToCartHandler}
    />
  );
};

export default AddToCartButton;
