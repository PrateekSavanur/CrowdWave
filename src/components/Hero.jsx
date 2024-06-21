import { useState, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Hero = ({ handleSearchFocus }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef(null);

  const focusSearchInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsSearchFocused(true);
    }
  };

  return (
    <div className="w-11/12 xl:w-4/5 h-[350px] md:h-[450px] m-auto bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl shadow-lg overflow-hidden mb-10">
      <div className="w-full h-full flex flex-col md:flex-row justify-center items-center">
        <div className="w-11/12 xl:w-1/2 p-5 space-y-5 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-800">
            Discover and Support True Innovation.
          </h1>
          <div className="bg-white flex items-center space-x-2 px-5 py-3 rounded-full shadow-md">
            <AiOutlineSearch
              className="text-gray-500 cursor-pointer"
              size={"1.5rem"}
              onClick={focusSearchInput}
            />
            <input
              ref={inputRef}
              className={`outline-none w-full text-gray-700 ${
                isSearchFocused ? "focus:ring-2 focus:ring-blue-500" : ""
              }`}
              type="text"
              placeholder="Search Startups"
            />
          </div>
        </div>
        <div className="hidden md:flex p-5 justify-end">
          <img
            className="w-[300px] md:w-[400px] h-[250px] md:h-[300px] rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
            src="images/people.jpeg"
            alt="People collaborating"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
