import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../models/Product";
import ProductCard from "../components/ProductCard";

const SingleCategory: FC = () => {
  const { slug } = useParams();
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/category/${slug}`);
        const data = await res.json();
        setProductList(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <div className="container mx-auto min-h-[83vh] p-6 font-karla">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-5 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold capitalize">{slug}</h1>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-lg dark:text-white mt-4">
        <span className="text-gray-500">Categories</span>
        <span className="text-gray-400"> {">"} </span>
        <span className="font-semibold capitalize">{slug}</span>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <span className="text-xl font-semibold text-gray-500 animate-pulse">Loading products...</span>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          {productList.length > 0 ? (
            <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-6">
              {productList.map((product) => (
                <div key={product.id} className="transition-transform transform hover:scale-105">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center text-gray-500 text-lg mt-10">
              No products found in this category.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SingleCategory;
