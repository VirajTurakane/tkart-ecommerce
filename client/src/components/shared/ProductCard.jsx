import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Rating from "./Rating";
import { ArrowDown, Heart } from "iconsax-reactjs";
import { darkBlue } from "@/constants/colorConstants";
import VariantCard from "./VariantCard";
import { useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/features/wishlist/thunks";
import { toast } from "sonner";
import {
  addedToWishlist,
  removedFromWishlist,
} from "@/constants/textConstants";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import RemoveFromCartButton from "./RemoveFromCart";

const ProductCard = ({ product, isAddedToWishlist, remove }) => {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success(removedFromWishlist);
  };

  const addToWishlistHandler = (productId) => {
    dispatch(addToWishlist(productId));
    toast.success(addedToWishlist);
  };

  useEffect(() => {
    if (product) {
      setImages([product.thumbnail, ...(product.imageURLs || [])]);
    }
  }, [product]);

  return (
    <div className="flex flex-col rounded shadow-lg md:border-2 md:flex-row border-primary-100 hover:border-primary-200">
      <Carousel images={images} />
      <div className="flex-1 min-w-0 m-2">
        <div className="flex flex-col justify-between h-full gap-2">
          <div>
            <div className="flex items-center justify-between w-full">
              <div>
                <strong className="text-lg font-medium break-words">
                  {product.name}
                </strong>{" "}
                <span className="text-lg break-words">
                  {product.description}
                </span>
              </div>
              <div
                className="self-start"
                onClick={() => {
                  isAddedToWishlist
                    ? removeFromWishlistHandler(product._id)
                    : addToWishlistHandler(product._id);
                }}
              >
                <Heart
                  size={32}
                  color={isAddedToWishlist ? "#ff0000" : darkBlue}
                  variant={isAddedToWishlist ? "Bold" : "Linear"}
                />
              </div>
            </div>
            <Rating
              rating={
                product.raters > 0 && product.totalRating != null
                  ? product.totalRating / product.raters
                  : 0
              }
            />
            <div className="flex items-center gap-2">
              {product.discount > 0 && (
                <div className="flex items-center">
                  <ArrowDown size={16} color={darkBlue} />
                  <span className="font-medium text-primary-200">
                    ${product.discount} %
                  </span>
                  <span className="ml-2 text-gray-700 line-through">
                    ${product.price}
                  </span>
                </div>
              )}
              <span className="font-bold text-primary-200">
                ${product.price - (product.discount / 100) * product.price}
              </span>
            </div>
            {product.variants.length !== 0 && (
              <div className="md:flex-1 md:min-w-0">
                <div>Colors</div>
                <div className="max-w-full overflow-x-scroll">
                  <div className="flex gap-2 p-1">
                    {product.variants.map((variant, index) => {
                      return <VariantCard variant={variant} key={index} />;
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {!remove ? (
              <AddToCartButton productId={product._id} />
            ) : (
              <RemoveFromCartButton productId={product._id} />
            )}

            <BuyNowButton productId={product._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
