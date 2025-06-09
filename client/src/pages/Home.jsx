import Card from "@/components/shared/Card";
import { twhite } from "@/constants/colorConstants";
import { Add } from "iconsax-reactjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { product, loading } = useSelector((state) => state.product);

  useEffect(() => {
    console.log(product);
  }, [product]);

  if (!loading)
    return (
      <div className="w-screen h-screen">
        <div className="grid grid-cols-2 gap-2 p-2 md:px-10 md:gap-4 lg:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {product?.products.map((product) => {
            return (
              <Card
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
