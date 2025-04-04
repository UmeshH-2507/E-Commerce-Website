import { FC } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setCartState } from "../redux/features/cartSlice";
import { updateModal } from "../redux/features/authSlice";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import CustomPopup from "./CustomPopup";
import { updateDarkMode } from "../redux/features/homeSlice";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((state) => state.cartReducer.cartItems.length);
  const username = useAppSelector((state) => state.authReducer.username);
  const isDarkMode = useAppSelector((state) => state.homeReducer.isDarkMode);
  const { requireAuth } = useAuth();

  const showCart = () => {
    requireAuth(() => dispatch(setCartState(true)));
  };

  return (
    <nav className="py-3 fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-md transition-all">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-white transition-all hover:scale-105"
        >
          UMESH
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex w-full max-w-lg relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="border border-gray-300 dark:border-gray-700 px-5 py-2 w-full bg-gray-50 dark:bg-gray-800 text-black dark:text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-all">
            <BsSearch size={18} />
          </button>
        </div>

        {/* Navbar Items */}
        <div className="flex items-center gap-4 md:gap-6 dark:text-white">
          <Link
            to="/products"
            className="text-lg font-medium hover:text-blue-500 transition-all"
          >
            Products
          </Link>
          <Link
            to="/categories"
            className="text-lg font-medium hover:text-blue-500 transition-all"
          >
            Categories
          </Link>

          {/* User Section */}
          <div className="flex items-center gap-2">
            {username ? (
              <img
                src="https://robohash.org/Terry.png?set=set4"
                alt="avatar"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-md"
              />
            ) : (
              <FaUser className="text-gray-500 text-xl md:text-2xl dark:text-white cursor-pointer" />
            )}
            {username ? (
              <CustomPopup />
            ) : (
              <span
                className="cursor-pointer text-blue-600 hover:underline transition-all"
                onClick={() => dispatch(updateModal(true))}
              >
                Login
              </span>
            )}
          </div>

          {/* Cart */}
          <div
            className="relative cursor-pointer hover:opacity-80 transition-all transform hover:scale-110"
            onClick={showCart}
          >
            <AiOutlineShoppingCart className="text-2xl md:text-3xl dark:text-white" />
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-600 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center shadow-md">
                {cartCount}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            className="cursor-pointer p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center justify-center w-9 h-9 md:w-10 md:h-10"
            onClick={() => {
              dispatch(updateDarkMode(!isDarkMode));
              document.body.classList.toggle("dark");
            }}
          >
            {isDarkMode ? (
              <MdOutlineLightMode className="text-yellow-500" size={20} />
            ) : (
              <MdOutlineDarkMode className="text-gray-700" size={20} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
