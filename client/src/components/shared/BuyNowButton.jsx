import React from "react";
import TButton from "./TButton";
import { Card } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";

const BuyNowButton = ({ productId }) => {
  const navigate = useNavigate();

  const buyNowHandler = () => {
    navigate(`/order/${productId}`);
  };
  return (
    <TButton
      icon={<Card size={22} />}
      text={"Buy Now"}
      outlined={false}
      onClick={buyNowHandler}
    />
  );
};

export default BuyNowButton;
