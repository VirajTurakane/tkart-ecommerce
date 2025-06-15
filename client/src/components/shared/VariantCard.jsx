import React from "react";

const VariantCard = ({ variant }) => {
  return (
    <div className="min-w-[200px] max-w-[200px] rounded-lg p-2 flex-shrink-0 border border-primary-100 w-[400px]">
      <div>
        <span className="font-bold">{variant.colorName}</span>
      </div>
      <div>
        <img
          className="object-cover w-[400px] h-[200px] rounded-lg"
          src={variant.thumbnail}
          alt="Thumbnail"
        />
      </div>
    </div>
  );
};

export default VariantCard;
