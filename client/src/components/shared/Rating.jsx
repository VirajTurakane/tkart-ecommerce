import { blue, lightBlue } from "@/constants/colorConstants";
import { Star1 } from "iconsax-reactjs";
import React from "react";

const Rating = ({ rating }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        <Star1
          size="16"
          color={rating > 0 ? blue : "#555555"}
          variant={rating > 0 ? "Bold" : "Linear"}
        />
        <Star1
          size="16"
          color={rating > 1.5 ? blue : "#555555"}
          variant={rating >= 1.5 ? "Bold" : "Linear"}
        />
        <Star1
          size="16"
          color={rating > 2.5 ? blue : "#555555"}
          variant={rating >= 2.5 ? "Bold" : "Linear"}
        />
        <Star1
          size="16"
          color={rating > 3.5 ? blue : "#555555"}
          variant={rating >= 3.5 ? "Bold" : "Linear"}
        />
        <Star1
          size="16"
          color={rating > 4.5 ? blue : "#555555"}
          variant={rating >= 4.5 ? "Bold" : "Linear"}
        />
      </div>
      <span>{rating}</span>
    </div>
  );
};

export default Rating;
