import React from "react";
import { Button } from "../ui/button";

const TButton = ({ text, onClick, icon, outlined }) => {
  return outlined ? (
    <div>
      <Button
        onClick={onClick}
        variant={"outline"}
        className="w-full text-primary-200"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{text}</span>
        </div>
      </Button>
    </div>
  ) : (
    <div>
      <Button
        onClick={onClick}
        className="w-full bg-primary-200 hover:bg-tblack text-twhite"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{text}</span>
        </div>
      </Button>
    </div>
  );
};

export default TButton;
