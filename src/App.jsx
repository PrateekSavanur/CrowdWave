import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Home from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
