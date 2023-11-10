import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
// ----------------------------------Component----------------------------------------
import { Header } from "./components/Header";

// -----------------------------------Pages---------------------------------------------------
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import ProductDetails from "./pages/ProductDetails";


const App = () => {

  return (
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />}/>
          <Route path="/create" element={<Create />}/>
          <Route path="/products/:id" element={<ProductDetails/>}/>
        </Routes>
      </div>
  );
};

export default App;

