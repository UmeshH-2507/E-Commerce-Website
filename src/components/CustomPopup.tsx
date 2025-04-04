import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  MdFavoriteBorder,
  MdOutlineAccountCircle,
  MdOutlineLogout,
} from "react-icons/md";
import { doLogout } from "../redux/features/authSlice";
import { Link } from "react-router-dom";

const CustomPopup: FC = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setVisible] = useState(false);
  const username = useAppSelector((state) => state.authReducer.username);

  const handlePopup = () => {
    setVisible((v) => !v);
  };

  const handleLogout = () => {
    dispatch(doLogout());
    hidePopup();
  };

  const hidePopup = () => {
    setVisible(false);
  };

  return (
    <div className="relative font-karla">
      <div
        className="inline-block cursor-pointer hover:opacity-85 dark:text-white text-gray-800 font-semibold"
        onClick={handlePopup}
        data-test="username-popup"
      >
        {username}
      </div>
      {isVisible && (
        <div
          className="absolute left-[-50px] mt-2 w-44 rounded-lg shadow-lg bg-white dark:bg-gray-700 dark:text-white ring-1 ring-black ring-opacity-5 transition-all transform scale-95 origin-top focus:outline-none"
          data-test="popup-content-list"
        >
          <ul className="p-3 space-y-2">
            <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <MdOutlineAccountCircle className="text-lg" />
              <Link to="/account" onClick={hidePopup} className="w-full">
                Account
              </Link>
            </li>
            <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <MdFavoriteBorder className="text-lg" />
              <Link to="/wishlist" onClick={hidePopup} className="w-full">
                Wishlist
              </Link>
            </li>
            <li
              className="flex items-center gap-2 px-3 py-2 rounded-md text-red-500 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-red-400 transition cursor-pointer"
              onClick={handleLogout}
              data-test="logout-btn"
            >
              <MdOutlineLogout className="text-lg" />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomPopup;