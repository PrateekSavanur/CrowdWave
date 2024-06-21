import { AiOutlineSearch } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";
import { BiUser } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className="w-11/12 xl:w-4/5 m-auto flex justify-between items-center py-5 bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800">
        CROWD<span className="text-blue-500">WAVE</span>
      </h1>
      <div>
        <ul className="hidden md:flex space-x-8 text-base font-medium text-gray-600">
          <li className="hover:text-blue-500 cursor-pointer">Home</li>
          <li className="hover:text-blue-500 cursor-pointer">Startups</li>
          <li className="hover:text-blue-500 cursor-pointer">Categories</li>
          <li className="hover:text-blue-500 cursor-pointer">About Us</li>
        </ul>
      </div>
      <div className="flex space-x-6">
        <AiOutlineSearch
          className="text-gray-600 hover:text-blue-500 cursor-pointer"
          size={"1.5rem"}
        />
        <FaHandshake
          className="text-gray-600 hover:text-blue-500 cursor-pointer"
          size={"1.5rem"}
        />
        <BiUser
          className="text-gray-600 hover:text-blue-500 cursor-pointer"
          size={"1.5rem"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
