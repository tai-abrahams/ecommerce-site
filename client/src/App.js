import React from 'react';
import './css/App.css';
import Home from './components/Home'
import ProductList from './components/pages/ProductList'
import Product from "./components/pages/Product"
import Register from "./components/pages/Register"
import Login from "./components/pages/Login"
import Cart from "./components/pages/Cart"
import Success from "./components/pages/Success"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./css/App.css";
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector((state)=>state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={!user ? <Navigate replace to="/login" /> : <Home />} />
        <Route exact path="/products/:category" element={<ProductList />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/success" element={ <Success  /> } />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
        <Route exact path="/register" element={user ? <Navigate replace to="/" /> : <Register />} />

      </Routes>
    </Router>
  );
}

export default App;
