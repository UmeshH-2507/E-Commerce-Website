import { FC } from "react";
import { Link } from "react-router-dom";

const Banner: FC = () => (
  <div className="container mt-12 mx-auto px-6 md:flex font-lora rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
    <img
      src="/banner.jpg"
      alt="banner"
      className="md:w-1/2 w-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
    />
    <div className="md:w-1/2 flex flex-col items-center text-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Don't Miss the Offer</h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Grab It Now</h2>
      <Link
        to="/product/4"
        className="inline-block bg-blue-500 text-white font-medium rounded-md px-6 py-3 shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600"
        data-test="banner-btn"
      >
        Shop Now
      </Link>
    </div>
  </div>
);

export default Banner;