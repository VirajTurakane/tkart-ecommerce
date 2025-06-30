import DetailsCard from "@/components/shared/DetailsCard";
import Header from "@/components/shared/Header";
import React from "react";

const Product = () => {
  return (
    <div className="w-full">
      <Header title={"Product"} />

      <div className="py-4 px-[5%]">
        <DetailsCard />
      </div>
    </div>
  );
};

export default Product;
