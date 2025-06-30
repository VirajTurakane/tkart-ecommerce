import Card from "@/components/shared/Card";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { twhite } from "@/constants/colorConstants";
import { selectWishlist } from "@/features/wishlist/selector";
import { fetchWishlist } from "@/features/wishlist/thunks";
import { isAddedToWishlist } from "@/utils/helper/wishlist";
import { Add } from "iconsax-reactjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const { product, loading } = useSelector((state) => state.product);
  const wishlist = useSelector(selectWishlist);

  if (!loading)
    return (
      <div>
        <Header />

        <div className="z-0 grid grid-cols-2 gap-2 p-2 mt-2 md:px-10 md:gap-4 lg:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {product?.products.map((product) => {
            const isAdded = isAddedToWishlist(wishlist, product);

            return (
              <Card
                key={product._id}
                isAddedToWishlist={isAdded ? true : false}
                id={product._id}
                price={product.price}
                thumbnail={product.thumbnail}
                discount={product.discount}
                name={product.name}
                icon={<Add size={22} color={twhite} />}
              />
            );
          })}
        </div>
      </div>
    );
};

export default Home;
