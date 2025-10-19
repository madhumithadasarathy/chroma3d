import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Home from "./Components/Home/Home.jsx";
import Services from "./Components/Services/Services.jsx";
import Products from "./Components/Products/Products.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import GetQuote from "./Components/GetQuote/GetQuote.jsx";
import Footers from "./Components/Footers/Footers.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/get-quote" element={<GetQuote />} />
      </Routes>

      {/* === Global Footer (visible on all pages) === */}
      <Footers />
    </>
  );
}
