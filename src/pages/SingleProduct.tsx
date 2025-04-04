import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { addToCart, setCartState } from "../redux/features/cartSlice";
import { Product } from "../models/Product";
import RatingStar from "../components/RatingStar";
import PriceSection from "../components/PriceSection";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHandHoldingDollar } from "react-icons/fa6";
import ProductList from "../components/ProductList";
import Reviews from "../components/Reviews";
import useAuth from "../hooks/useAuth";
import { MdFavoriteBorder } from "react-icons/md";
import { addToWishlist } from "../redux/features/productSlice";

const SingleProduct: FC = () => {
  const dispatch = useAppDispatch();
  const { productID } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [imgs, setImgs] = useState<string[]>([]);
  const [selectedImg, setSelectedImg] = useState<string>("");
  const [sCategory, setScategory] = useState<string | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const { requireAuth } = useAuth();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${productID}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setImgs(data.images || []);
        setScategory(data.category);
        setSelectedImg(data.thumbnail || data.images?.[0] || "");
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productID]);

  useEffect(() => {
    if (!sCategory) return;

    const fetchPreferences = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/category/${sCategory}`);
        if (!res.ok) throw new Error("Failed to fetch similar products");
        const data = await res.json();
        const filtered = data.products.filter(
          (p: Product) => productID && p.id !== parseInt(productID)
        );
        setSimilar(filtered);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    fetchPreferences();
  }, [productID, sCategory]);

  const addCart = () => {
    requireAuth(() => {
      if (product) {
        dispatch(addToCart(product));
        toast.success("Item added to cart!");
      }
    });
  };

  const buyNow = () => {
    requireAuth(() => {
      if (product) {
        dispatch(addToCart(product));
        dispatch(setCartState(true));
      }
    });
  };

  const addWishlist = () => {
    requireAuth(() => {
      if (product) {
        dispatch(addToWishlist(product));
        toast.success("Added to wishlist!");
      }
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 font-karla text-gray-900 dark:text-white">
      {/* Product Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Image & Thumbnails */}
        <div className="space-y-5">
          <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg">
            {selectedImg ? (
              <img
                src={selectedImg}
                alt="Selected product"
                className="w-full h-96 object-contain transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
          </div>
          <div className="flex justify-center gap-3">
            {imgs.map((_img) => (
              <img
                key={_img}
                src={_img}
                alt="Thumbnail"
                onClick={() => setSelectedImg(_img)}
                className={`w-14 h-14 rounded-md object-cover border-2 transition-all duration-300 cursor-pointer hover:opacity-80 ${
                  _img === selectedImg ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">{product?.title || "Loading..."}</h1>
            {product?.rating && <RatingStar rating={product.rating} />}
            {product?.discountPercentage && product?.price && (
              <div className="my-4">
                <PriceSection discountPercentage={product.discountPercentage} price={product.price} />
              </div>
            )}
            <table className="text-sm w-full mb-4">
              <tbody>
                <tr>
                  <td className="font-semibold pr-3 py-1">Brand:</td>
                  <td>{product?.brand || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-3 py-1">Category:</td>
                  <td className="capitalize">{product?.category || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-3 py-1">Stock:</td>
                  <td>{product?.stock ?? "N/A"}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <h3 className="text-lg font-semibold mb-1">📝 About this product</h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {product?.description || "No description available."}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={addCart}
              aria-label="Add to Cart"
              className="flex items-center gap-2 px-5 py-2 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 transition-transform hover:scale-105"
            >
              <AiOutlineShoppingCart /> Add to Cart
            </button>
            <button
              onClick={buyNow}
              aria-label="Buy Now"
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow hover:to-blue-800 transition-transform hover:scale-105"
            >
              <FaHandHoldingDollar /> Buy Now
            </button>
            <button
              onClick={addWishlist}
              aria-label="Add to Wishlist"
              className="flex items-center gap-2 px-5 py-2 bg-yellow-500 text-white rounded-full shadow hover:bg-yellow-600 transition-transform hover:scale-105"
            >
              <MdFavoriteBorder /> Wishlist
            </button>
          </div>
        </div>

        {/* Reviews */}
        {product && <Reviews id={product.id} />}
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <hr className="mb-6 border-gray-300 dark:border-gray-600" />
        <ProductList title="🛍️ Similar Products" products={similar} />
      </div>
    </div>
  );
};

export default SingleProduct;
