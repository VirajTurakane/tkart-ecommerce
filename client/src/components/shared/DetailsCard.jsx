import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/features/product/thunks.js";
import Loader from "./Loader";
import {
  selectSingleProduct,
  selectSingleProductLoading,
} from "@/features/product/selectors";
import Carousel from "./Carousel";
import Rating from "./Rating";
import { ArrowDown, Card, Heart } from "iconsax-reactjs";
import { darkBlue } from "@/constants/colorConstants";
import VariantCard from "./VariantCard";
import TButton from "./TButton";
import { ShoppingCart } from "iconsax-reactjs";
import { addToWishlist, removeFromWishlist } from "@/features/wishlist/thunks";
import { selectWishlist } from "@/features/wishlist/selector";

const DetailsCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [isAddedToWishlist, setIsAdded] = useState(false);

  const singleProduct = useSelector(selectSingleProduct);
  const singleProductLoading = useSelector(selectSingleProductLoading);

  const addToWishlistHandler = (productId) => {
    dispatch(addToWishlist(productId));
  };

  const removeFromWishlistHandler = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const wishlist = useSelector(selectWishlist);

  useEffect(() => {
    setIsAdded(wishlist?.some((element) => element.product._id === id));
  }, [wishlist]);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct) {
      setImages([singleProduct?.thumbnail, ...(singleProduct.imageURLs || [])]);
    }
  }, [singleProduct]);

  return (
    <div className="flex flex-col rounded shadow-lg md:border-2 md:flex-row border-primary-100 hover:border-primary-200">
      {singleProductLoading && <Loader />}
      <Carousel images={images} />
      <div className="flex-1 min-w-0 m-2">
        <div className="flex flex-col justify-between h-full gap-2">
          <div>
            <div className="flex items-center justify-between w-full">
              <div>
                <strong className="text-lg font-medium break-words">
                  {singleProduct?.name ?? "Loading"}
                </strong>{" "}
                <span className="text-lg break-words">
                  {singleProduct?.description ?? "Loading"}
                </span>
              </div>
              <div
                className="self-start"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isAddedToWishlist) {
                    addToWishlistHandler(id);
                  } else {
                    removeFromWishlistHandler(id);
                  }
                }}
              >
                <Heart
                  size={32}
                  color={isAddedToWishlist ? "#ff0000" : darkBlue}
                  variant={isAddedToWishlist ? "Bold" : "Linear"}
                />
              </div>
            </div>
            {singleProductLoading ? (
              "Loading"
            ) : (
              <Rating
                rating={
                  singleProduct?.raters > 0 &&
                  singleProduct?.totalRating != null
                    ? singleProduct.totalRating / singleProduct.raters
                    : 0
                }
              />
            )}
            <div className="flex gap-2 items-cente">
              {singleProduct?.discount > 0 && (
                <div className="flex items-center">
                  <ArrowDown size={16} color={darkBlue} />
                  <span className="font-medium text-primary-200">
                    ${singleProduct?.discount} %
                  </span>
                  <span className="ml-2 text-gray-700 line-through">
                    ${singleProduct?.price}
                  </span>
                </div>
              )}
              <span className="font-bold text-primary-200">
                $
                {singleProduct?.price -
                  (singleProduct?.discount / 100) * singleProduct?.price}
              </span>
            </div>
            {singleProduct?.variants.length !== 0 && (
              <div className="md:flex-1 md:min-w-0">
                <div>Colors</div>
                <div className="max-w-full overflow-x-scroll">
                  <div className="flex gap-2 p-1">
                    {singleProduct?.variants.map((variant, index) => {
                      return <VariantCard variant={variant} key={index} />;
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <TButton
              outlined={true}
              icon={<ShoppingCart size={22} color={darkBlue} />}
              text={"Add To Cart"}
            />
            <TButton icon={<Card />} text={"Buy Now"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
