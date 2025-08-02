import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeMain from "./components/HomeMain";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import About from "./components/About";
import Products from "./components/Products";
import AdminPage from "./pages/AdminPage";
import Services from "./components/Services";
import AdminProducts from "./components/admin/AdminProducts";
import AdminManagement from "./components/admin/AdminManagement";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomeMain />
              </>
            }
          />
          <Route path="/adminn" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminManagement />} />

        </Routes>
      </div>
    </Router>
  );
}
export default App;
