import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Rating from "./Rating";
import { ArrowDown, Card, Heart } from "iconsax-reactjs";
import { darkBlue } from "@/constants/colorConstants";
import VariantCard from "./VariantCard";
import TButton from "./TButton";
import { ShoppingCart } from "iconsax-reactjs";
import { useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/features/wishlist/thunks";

const ProductCard = ({ product, isAddedToWishlist }) => {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (productId) => {
    dispatch(removeFromWishlist(productId));
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
                  removeFromWishlistHandler(product._id);
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

export default ProductCard;
