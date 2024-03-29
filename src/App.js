import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import CatList from "./CatList";
import MyForm from "./MyForm";
const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/list" element={<CatList />} />
          <Route path="/myform" element={<MyForm />} />
          {/* Add routes for other pages if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
