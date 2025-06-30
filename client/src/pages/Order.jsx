import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Item from "@/components/shared/Item";
import Loader from "@/components/shared/Loader";
import Quantity from "@/components/shared/Quantity";
import TButton from "@/components/shared/TButton";
import { increment } from "@/features/order/orderSlice";
import { order } from "@/features/order/thunks";
import { selectSingleProduct } from "@/features/product/selectors";
import { fetchProductById } from "@/features/product/thunks";
import { fetchUser } from "@/features/user/thunks";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Order = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch]);

  const singleProduct = useSelector(selectSingleProduct);

  const { quantity } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const proceedHandler = () => {
    dispatch(order({ quantity, id }));
    toast.success("Order successful.");
    navigate("/orders");
  };

  if (loading) return <Loader />;
  return (
    <div className="flex flex-col w-full h-full min-h-screen gap-4">
      <Header title={"Checkout"} />
      <div className="px-[3%] sm:px-[4%] md:px-[5%] flex flex-col gap-8 md:flex md:flex-row">
        <div className="flex flex-col gap-6 md:flex md:flex-[70%]">
          <div className="flex justify-between p-2 rounded shadow-md">
            <div>
              <span className="text-lg font-medium">
                Delivering to{" "}
                <strong className="font-medium">
                  {user?.fname} {user?.lname}
                </strong>
              </span>
              <div>{user?.shippingAddress}</div>
            </div>
            <div className="text-primary-50">Change</div>
          </div>
          <div>
            <Quantity quantity={quantity} />
          </div>
        </div>
        <div className="p-2 rounded h-40 shadow-md flex flex-col gap-2 md:flex-[30%]">
          <div>
            <Item title={"Items"} value={`$${singleProduct?.price}.00`} />
            <Item title={"Quantity"} value={quantity} />
            <Item title={"Delivery"} value={"Free"} />
            <Item
              title={"Total"}
              value={`$${Number.parseInt(singleProduct?.price) * quantity}.00`}
            />
          </div>

          <TButton text={"Proceed"} onClick={proceedHandler} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
