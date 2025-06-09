import { darkBlue } from "@/constants/colorConstants";
import { Heart } from "iconsax-reactjs";
import React, { useState } from "react";

const Card = ({ thumbnail, name, price, discount, icon }) => {
    const [toggle, setToggle] = useState(false);
  return (
    <div className="relative w-auto transition-all duration-300 ease-linear shadow-xl rounded-xl hover:scale-105">
      <div className="absolute z-10 top-1 right-1" onClick={() => setToggle(!toggle)}><Heart size={32} color={toggle ? "#ff0000" : darkBlue} variant={toggle ? "Bold" : "Linear"} /></div>
      <div className="rounded">
        <img src={thumbnail} alt="image" className="rounded-tr-xl rounded-tl-xl" />
      </div>
      <div className="relative px-2 py-4 hover:bg-gray-200 rounded-b-xl">
          <div className="text-lg font-medium text-primary-200">{name}</div>
          <div className="font-medium text-primary-200">${price}</div>
          <div className="absolute bottom-0 right-0 p-2 bg-primary-200 rounded-br-xl rounded-tl-xl">{icon}</div>
      </div>
    </div>
  );
};

export default Card;
