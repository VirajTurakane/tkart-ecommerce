import React from "react";
import TButton from "./TButton";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/features/cart/thunks";
import { toast } from "sonner";
import { removedFromCart } from "@/constants/textConstants";
import { CloseCircle } from "iconsax-reactjs";
import { darkBlue } from "@/constants/colorConstants";

const RemoveFromCartButton = ({ productId }) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(removeFromCart(productId));
    toast.success(removedFromCart);
  };
  return (
    <TButton
      icon={<CloseCircle size={22} color={darkBlue} />}
      text={"Delete"}
      outlined={true}
      onClick={addToCartHandler}
    />
  );
};

export default RemoveFromCartButton;
