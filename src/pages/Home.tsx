import { FC, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import TrendingProducts from "../components/TrendingProducts";
import { useAppDispatch } from "../redux/hooks";
import {
  updateNewList,
  updateFeaturedList,
} from "../redux/features/productSlice";
import { Product } from "../models/Product";
import LatestProducts from "../components/LatestProducts";
import Banner from "../components/Banner";

const Home: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=24");
        const { products } = await response.json();
        const productList: Product[] = products.map((product: Product) => ({
          id: product.id,
          title: product.title,
          images: product.images,
          price: product.price,
          rating: product.rating,
          thumbnail: product.thumbnail,
          description: product.description,
          category: product.category,
          discountPercentage: product.discountPercentage,
        }));

        dispatch(updateFeaturedList(productList.slice(0, 8)));
        dispatch(updateNewList(productList.slice(8, 16)));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="dark:bg-gray-900 bg-gray-100 min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4">
        <Features />
        <TrendingProducts />
        <Banner />
        <LatestProducts />
      </div>
      <br />
    </div>
  );
};

export default Home;