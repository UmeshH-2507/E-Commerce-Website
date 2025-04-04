import { FC, useEffect, useState } from "react";

interface Address {
  address: string;
  city: string;
  postalCode: string;
  state: string;
}

interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}

interface UserInfo {
  id: number;
  image: string;
  username: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  bloodGroup: string;
  address: Address;
  company: Company;
  university: string;
}

const Profile: FC = () => {
  const [info, setInfo] = useState<UserInfo>();

  useEffect(() => {
    fetch("https://dummyjson.com/users/1")
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
      });
  }, []);

  return (
    <div className="container mx-auto min-h-[83vh] w-full max-w-4xl p-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Your Account</h1>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-6">
        <img
          src={info?.image}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-md"
        />
        <h2 className="text-2xl font-bold mt-3">{info?.firstName} {info?.lastName}</h2>
        <p className="text-gray-600 dark:text-gray-300">{info?.email}</p>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Personal Info */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Personal Info</h3>
          <hr className="my-3 border-purple-300" />
          <p><span className="font-semibold">Username:</span> {info?.username}</p>
          <p><span className="font-semibold">Age:</span> {info?.age}</p>
          <p><span className="font-semibold">Gender:</span> {info?.gender}</p>
          <p><span className="font-semibold">Blood Group:</span> {info?.bloodGroup}</p>
          <p><span className="font-semibold">Phone:</span> {info?.phone}</p>
          <p><span className="font-semibold">University:</span> {info?.university}</p>
        </div>

        {/* Address */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-pink-600 dark:text-pink-400">Address</h3>
          <hr className="my-3 border-pink-300" />
          <p>{info?.address.address}</p>
          <p>{info?.address.city}, {info?.address.postalCode}</p>
          <p>{info?.address.state}</p>
        </div>

        {/* Company Info */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg md:col-span-2">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Company</h3>
          <hr className="my-3 border-blue-300" />
          <p><span className="font-semibold">Name:</span> {info?.company.name}</p>
          <p><span className="font-semibold">Department:</span> {info?.company.department}</p>
          <p><span className="font-semibold">Title:</span> {info?.company.title}</p>
          <p>{info?.company.address.address}</p>
          <p>{info?.company.address.city}, {info?.company.address.postalCode}</p>
          <p>{info?.company.address.state}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
