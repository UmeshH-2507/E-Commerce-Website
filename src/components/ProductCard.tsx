import { FC } from "react";
import { Product } from "../models/Product";
import RatingStar from "./RatingStar";
import { addToCart } from "../redux/features/cartSlice";
import { useAppDispatch } from "../redux/hooks";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import PriceSection from "./PriceSection";
import useAuth from "../hooks/useAuth";

const ProductCard: FC<Product> = ({
  id,
  price,
  thumbnail,
  title,
  category,
  rating,
  discountPercentage,
}) => {
  const dispatch = useAppDispatch();
  const { requireAuth } = useAuth();

  const addCart = () => {
    requireAuth(() => {
      dispatch(
        addToCart({
          id,
          price,
          title,
          category,
          rating,
          thumbnail,
          discountPercentage,
        })
      );
      toast.success("Item added to cart successfully!", {
        duration: 3000,
      });
    });
  };

  return (
    <div className="relative group bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg transition-all hover:shadow-2xl hover:scale-[1.02] overflow-hidden">
      <div className="relative text-center border-b border-gray-200 dark:border-gray-700">
        <Link to={`/product/${id}`}>
          <img
            src={thumbnail}
            alt={title}
            className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-t-xl"
            loading="lazy"
          />
        </Link>
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-sm font-medium dark:text-gray-300 uppercase">
          {category}
        </p>
        <Link
          className="font-semibold text-lg dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition duration-200 block truncate"
          to={`/product/${id}`}
          title={title}
        >
          {title}
        </Link>
      </div>
      <div className="px-4">
        <RatingStar rating={rating} />
      </div>
      <div className="flex items-center justify-between px-4 pb-4">
        {discountPercentage && (
          <PriceSection discountPercentage={discountPercentage} price={price} />
        )}
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-full shadow-md transition-all hover:from-red-500 hover:to-pink-500 hover:scale-105"
          onClick={addCart}
          data-test="add-cart-btn"
          title="ADD TO CART"
          aria-label={`Add ${title} to cart`}
        >
          <AiOutlineShoppingCart className="text-lg" />
          <span className="text-sm font-medium">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
