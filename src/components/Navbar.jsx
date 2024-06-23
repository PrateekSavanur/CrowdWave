import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = ({ handleSearchFocus }) => {
  return (
    <nav className="w-full px-4 xl:px-0 xl:max-w-screen-xl mx-auto flex justify-between items-center py-5 bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 pl-8">
        CROWD<span className="text-amber-500">WAVE</span>
      </h1>
      <div className="hidden md:flex flex-1 justify-center items-center">
        <ul className="flex space-x-8 text-base font-medium text-gray-600">
          <li className="hover:text-blue-500 cursor-pointer">
            <Link to="/products">Startups</Link>
          </li>
          <li className="hover:text-blue-500 cursor-pointer">
            <Link to="/form">Raise Funds</Link>
          </li>
          <li className="hover:text-blue-500 cursor-pointer">
            <Link to="/proposals">Proposals</Link>
          </li>
          <li className="hover:text-blue-500 cursor-pointer">
            <a href="#footer">About Us</a>
          </li>
        </ul>
      </div>
      <div className="flex items-center pr-8">
        <AiOutlineSearch
          className="text-gray-600 hover:text-blue-500 cursor-pointer"
          size={"1.5rem"}
          onClick={handleSearchFocus}
        />
      </div>
    </nav>
  );
};

export default Navbar;
