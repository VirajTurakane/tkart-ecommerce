import Lottie from "lottie-react";
import React from "react";
import empty from "../../assets/animations/empty.json";

const Empty = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-[20%]">
        <div className="flex flex-col items-center justify-center">
          <Lottie animationData={empty} loop={true} />
          <div className="text-lg font-medium text-primary-200">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Empty;
