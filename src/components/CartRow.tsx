import { FC } from "react";
import { CartItem } from "../models/CartItem";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { useAppDispatch } from "../redux/hooks";
import {
  addToCart,
  reduceFromCart,
  removeFromCart,
} from "../redux/features/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import useDiscount from "../hooks/useDiscount";

const CartRow: FC<CartItem> = ({
  id,
  thumbnail,
  title,
  price,
  quantity,
  rating,
  category,
  discountPercentage = 0,
}) => {
  const dispatch = useAppDispatch();
  const result = useDiscount({ price, discount: discountPercentage });

  return (
    <div className="grid grid-cols-7 gap-3 border-b border-gray-300 dark:border-gray-600 py-4 items-center shadow-md rounded-lg p-3 bg-white dark:bg-gray-800">
      <img src={thumbnail} alt="thumbnail" className="h-20 w-20 object-cover rounded-md col-span-2" />
      <div className="col-span-3">
        <h3 className="font-bold leading-5 text-lg mb-1 text-gray-800 dark:text-white">{title}</h3>
        <div className="flex space-x-2 items-center text-gray-700 dark:text-gray-300">
          <h3 className="font-semibold text-lg">${result.toFixed(2)}</h3>
          {discountPercentage !== 0 && (
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">-{discountPercentage}%</span>
          )}
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <IoIosRemoveCircleOutline
            className="cursor-pointer text-gray-600 dark:text-gray-400 text-xl hover:text-red-500"
            onClick={() => dispatch(reduceFromCart(id))}
            data-test="cart-reduce-btn"
          />
          <span className="text-lg font-semibold" data-test="cart-item-quantity">{quantity}</span>
          <IoIosAddCircleOutline
            className="cursor-pointer text-gray-600 dark:text-gray-400 text-xl hover:text-green-500"
            data-test="cart-increase-btn"
            onClick={() =>
              dispatch(
                addToCart({
                  id,
                  title,
                  price,
                  quantity,
                  thumbnail,
                  rating,
                  category,
                })
              )
            }
          />
        </div>
      </div>
      <div className="font-bold col-span-2 flex flex-col items-end">
        {quantity && (
          <span className="text-lg font-semibold text-gray-900 dark:text-white" data-test="cart-item-price">
            ${(result * quantity).toFixed(2)}
          </span>
        )}
        <RiDeleteBin6Line
          className="text-red-500 cursor-pointer text-2xl mt-2 hover:text-red-700"
          onClick={() => dispatch(removeFromCart(id))}
          data-test="cart-remove-btn"
        />
      </div>
    </div>
  );
};

export default CartRow;