import React from "react";
import Lottie from "lottie-react";
import loading from "../../assets/animations/loading.json";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Semi-transparent dark background */}
      <div className="absolute inset-0 opacity-50 bg-tblack"></div>

      {/* Lottie animation on top */}
      <div className="relative z-10 w-40 h-40">
        <Lottie animationData={loading} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
