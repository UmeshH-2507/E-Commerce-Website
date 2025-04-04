import { FC, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { emptyCart, setCartState } from "../redux/features/cartSlice";
import CartRow from "./CartRow";
import toast from "react-hot-toast";

const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.cartReducer.cartOpen);
  const items = useAppSelector((state) => state.cartReducer.cartItems);
  const [checkout, setCheckout] = useState(false); // Optional: currently unused

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  const calculateTotal = () => {
    return items
      .reduce((total, item) => {
        const price = item.price || 0;
        const discount = item.discountPercentage || 0;
        const quantity = item.quantity || 0;

        const discountedPrice = price - (price * discount) / 100;
        return total + discountedPrice * quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="max-w-[420px] w-full min-h-screen bg-white/90 dark:bg-gray-900/80 backdrop-blur-lg shadow-2xl transition-transform duration-300 transform translate-x-0">
        {/* Exit Button */}
        <button
          onClick={() => dispatch(setCartState(false))}
          className="absolute top-5 right-5 p-2 rounded-full bg-red-500 text-white shadow-lg hover:scale-110 hover:bg-red-600 transition-all"
          aria-label="Close Cart"
        >
          <RxCross1 size={24} />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-300 dark:border-gray-700">
          <h3 className="font-bold text-2xl text-gray-800 dark:text-white">🛒 Your Cart</h3>
        </div>

        {/* Cart Items */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
          {items.length > 0 ? (
            items.map((item) => <CartRow key={item.id} {...item} />)
          ) : (
            <div className="flex flex-col justify-center items-center p-4">
              <img
                src="/emptyCart.jpg"
                alt="Your cart is empty"
                className="w-48 opacity-90"
              />
              <p className="text-center text-xl my-3 text-gray-700 dark:text-gray-300">
                Your cart is empty 😢
              </p>
            </div>
          )}
        </div>

        {/* Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-300 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-xl text-gray-800 dark:text-white">Total</h2>
              <h2 className="font-bold text-xl text-green-600">${calculateTotal()}</h2>
            </div>
            <button
              onClick={() => {
                setCheckout(true);
                toast.success("Proceeding to checkout... 🚀");
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
