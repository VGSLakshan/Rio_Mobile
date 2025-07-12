import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeMain from "./components/HomeMain";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
     <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <HomeMain />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
