import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import React, { useState } from "react";

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const increment = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const decrement = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full md:w-[40%] md:m-2 h-auto">
      <div className="overflow-hidden rounded">
        <img
          className="object-cover w-full h-[250px] md:h-[300px]"
          src={images[index]}
          alt="Image"
        />
      </div>
      <div className="flex justify-center w-full gap-2 pt-2">
        <ArrowLeft2 size={28} color="#555555" onClick={decrement} />
        <div>{index + 1}</div>
        <ArrowRight2 size={28} color="#555555" onClick={increment} />
      </div>
    </div>
  );
};

export default Carousel;
