import { decrement, increment } from "@/features/order/orderSlice";
import { Add, Minus } from "iconsax-reactjs";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Quantity = ({ quantity }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2 p-2 rounded shadow-md">
      <span className="font-bold">Quantity</span>
      <span className="px-2 py-1 border-2 rounded border-primary-200">{quantity}</span>
      <div>
        <Add className="cursor-pointer" onClick={() => dispatch(increment())} />
        <Minus
          className="cursor-pointer"
          onClick={() => {
            if (quantity >= 2) {
              dispatch(decrement());
            } else {
              toast.error("Quantity should atleast be 1");
            }
          }}
        />
      </div>
    </div>
  );
};

export default Quantity;
