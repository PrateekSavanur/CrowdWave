import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full px-4 xl:px-0 xl:max-w-screen-xl mx-auto flex justify-between items-center py-5 bg-white">
      <h1 className="text-3xl font-bold text-gray-800">
        <Link to="/">
          CROWD<span className="text-amber-500">WAVE</span>
        </Link>
      </h1>
      <div className="flex-1 flex justify-end items-center">
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
    </div>
  );
};

export default Navbar;
