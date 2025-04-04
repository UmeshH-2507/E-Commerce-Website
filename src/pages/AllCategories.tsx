import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addCategories } from "../redux/features/productSlice";
import { Link } from "react-router-dom";

const AllCategories: FC = () => {
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector(
    (state) => state.productReducer.categories
  );

  useEffect(() => {
    const fetchCategories = () => {
      fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((data) => {
          dispatch(addCategories(data));
        });
    };
    if (allCategories.length === 0) fetchCategories();
  }, [allCategories, dispatch]);

  return (
    <div className="container mx-auto min-h-[83vh] p-6 font-karla">
      <h2 className="text-3xl font-bold dark:text-white mb-6 text-center">🗂️ Browse Categories</h2>

      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {allCategories &&
          allCategories.map((category) => (
            <div
              key={category.slug}
              className="group bg-gradient-to-br from-gray-100 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 p-5 flex flex-col items-center text-center"
            >
              <div className="text-xl font-semibold capitalize text-gray-800 dark:text-white group-hover:text-blue-500 transition duration-200">
                {category.name}
              </div>

              <Link
                to={`/category/${category.slug}`}
                className="mt-3 text-sm font-medium text-blue-600 hover:underline dark:hover:text-blue-400 transition"
              >
                View Products →
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllCategories;
