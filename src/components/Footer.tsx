import { FC } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-900 text-white py-6 mt-auto">
      <div className="container mx-auto text-center flex flex-col items-center">
        {/* Branding */}
        <h2 className="text-2xl font-bold tracking-wide">🚀 Umesh-Hiremath-Shop</h2>

        {/* Navigation Links */}
        <div className="flex gap-6 mt-3 text-sm font-light">
          <Link to="/" className="hover:text-gray-300 transition-all">Home</Link>
          <Link to="/products" className="hover:text-gray-300 transition-all">Products</Link>
          <Link to="/contact" className="hover:text-gray-300 transition-all">Contact</Link>
          <Link to="/about" className="hover:text-gray-300 transition-all">About</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <FaFacebookF className="text-lg" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <FaTwitter className="text-lg" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <FaInstagram className="text-lg" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <FaGithub className="text-lg" />
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-sm opacity-80 mt-4">
          &copy; {new Date().getFullYear()} | All Rights Reserved |  
          <Link
            to="https://alim1496.github.io/"
            className="hover:underline hover:font-bold opacity-85 hover:opacity-100 ml-1"
          >
            M A Alim
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;