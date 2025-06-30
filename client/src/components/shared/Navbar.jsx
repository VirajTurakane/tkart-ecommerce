import logo from "../../assets/images/logo.png";
import Input from "./Input";
import {
  SearchNormal,
  ShoppingCart,
  Box,
  Login,
  UserAdd,
  Menu,
  Logout,
  CloseCircle,
  Heart,
  Home,
} from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import Divider from "./Divider";
import { darkBlue, twhite } from "@/constants/colorConstants";
import { logout } from "@/features/auth/authSlice";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const { auth } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully");

    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 py-4 md:mx-auto">
      <div className="flex items-center justify-between w-full px-4 lg:w-[80%] lg:px-0">
        <Link className="flex items-center w-8 h-12 gap-1 md:w-12" to={"/"}>
          <img src={logo} alt="Lo go" />
          <div className="text-xl font-bold text-primary-200 md:text-2xl">
            TKart
          </div>
        </Link>
        <div className="flex items-center gap-2 justify-end w-[80%]">
          <div className="w-[50%]">
            <Input
              icon={<SearchNormal size="22" color="#555555" />}
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="md:hidden">
            {!toggle ? (
              <Menu
                size={26}
                color="#555555"
                onClick={() => {
                  setToggle(!toggle);
                }}
              />
            ) : (
              <CloseCircle
                size={26}
                color="#555555"
                onClick={() => {
                  setToggle(!toggle);
                }}
              />
            )}
          </div>
          <div className="items-center hidden gap-4 md:flex">
            <div className="flex items-center">
              <Link className="my-border" to={"/"}>
                <Home size="22" color="#555555" /> <div>Home</div>
              </Link>
              <Link className="my-border" to={"/orders"}>
                <Box size="22" color="#555555" /> <div>Orders</div>
              </Link>
              <Link className="my-border" to={"/cart"}>
                <ShoppingCart size="22" color="#555555" />
                <div>Cart</div>
              </Link>
              <Link className="my-border" to={"/wishlist"}>
                <Heart size="22" color="#555555" />
                <div>Wishlist</div>
              </Link>
            </div>
            {auth && auth.id ? (
              <div>
                <Popover>
                  <PopoverTrigger>
                    {" "}
                    <Avatar className="w-10 h-10 cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded border-1 border-twhite hover:border-1 bg-primary-200">
                    <div
                      className="border-0 rounded cursor-pointer my-border hover:border-0"
                      onClick={logoutHandler}
                    >
                      <div className="flex items-center gap-2">
                        <Logout size="22" color={twhite} />
                        <span className="text-twhite">Logout</span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate("/login")}
                  variant={"outline"}
                  className="cursor-pointer border-primary-100"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  className="cursor-pointer bg-primary-200 text-twhite hover:bg-tblack"
                >
                  Signup
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Responsive div */}
      <div
        className={`absolute top-20 bg-primary-200 overflow-hidden border-0 pt-2 pb-2 rounded-b-2xl flex flex-col items-start self-start justify-start w-full md:hidden px-4 gap-2 transition-all duration-700 z-50 ease-linear ${
          toggle
            ? "max-h-full opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <LinkTo
          icon={<Home size="22" color={twhite} />}
          text={"Home"}
          to={"/"}
        />
        <Divider />
        <LinkTo
          icon={<Box size="22" color={twhite} />}
          text={"Orders"}
          to={"/orders"}
        />
        <Divider />
        <LinkTo
          icon={<ShoppingCart size="22" color={twhite} />}
          text={"Cart"}
          to={"/cart"}
        />
        <Divider />
        <LinkTo
          icon={<Heart size="22" color={twhite} />}
          text={"Wishlist"}
          to={"/wishlist"}
        />
        <Divider />
        {!auth.success && (
          <div>
            <LinkTo
              icon={<Login size="22" color={twhite} />}
              text={"Login"}
              to={"/login"}
            />
          </div>
        )}
        {!auth && <Divider />}

        {!auth.success && (
          <LinkTo
            icon={<UserAdd size="22" color={twhite} />}
            text={"Signup"}
            to={"/signup"}
          />
        )}
        {auth && auth.id && (
          <div className="my-border hover:border-0" onClick={logoutHandler}>
            <Logout size="22" color={twhite} />{" "}
            <span className="text-twhite">Logout</span>
          </div>
        )}
      </div>
    </div>
  );
};

const LinkTo = ({ icon, text, to }) => {
  return (
    <Link className="my-border hover:border-0" to={to}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-twhite">{text}</span>
      </div>
    </Link>
  );
};

export default memo(Navbar);
