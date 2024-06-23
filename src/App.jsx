import { useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Home from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Proposals from "./components/Proposals";

const App = () => {
  const [searchFocus, setSearchFocus] = useState(false);
  const searchRef = useRef();

  const handleSearchFocus = () => {
    setSearchFocus(true);
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <div className="">
      <Router>
        <>
          <Navbar handleSearchFocus={handleSearchFocus} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchFocus={searchFocus}
                  setSearchFocus={setSearchFocus}
                  searchRef={searchRef}
                />
              }
            />
            <Route
              path="/products"
              element={
                <Products
                  searchFocus={searchFocus}
                  setSearchFocus={setSearchFocus}
                  searchRef={searchRef}
                />
              }
            />
            <Route path="/form" element={<Form />} />
            <Route path="/proposals" element={<Proposals />} />
          </Routes>
          <Footer />
        </>
      </Router>
    </div>
  );
};

export default App;
