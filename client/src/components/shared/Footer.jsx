import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col w-full h-40 mt-5 bg-primary-200">
      <div className="flex flex-[50%] justify-center items-center gap-1 bg-primary-100">
        <div className="text-xl font-bold text-twhite md:text-2xl">
          TKart
        </div>
      </div>
      <div className="flex flex-[50%] flex-col items-center justify-center">
        <div className="flex gap-2">
          <LinkTo text={"Conditions of Use & Sale"} to={"/"} />
          <LinkTo text={"Privacy Notice"} to={"/"} />
          <LinkTo text={"Interest-Based Ads"} to={"/"} />
        </div>
        <div className="text-sm text-twhite">
          © 2025, tkart.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
};

export default Footer;

const LinkTo = ({ to, text }) => {
  return (
    <Link className="text-sm text-white underline hover:text-primary-50" to={to}>
      {text}
    </Link>
  );
};
