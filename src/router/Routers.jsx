import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
import RegisterProduct from '../components/product/RegisterProduct'
import ProductDetails from '../components/product/ProductDetails'
import Success from '../components/cart/Success'

import ProfileUser from '../components/user/ProfileUser'
import { AuthContext } from '../context/AuthContext'
import CartShop from '../components/cart/CartShop'
import ProductList from '../components/product/ProductsList'
import Failure from '../components/cart/Failure'

const Routers = () => {

  const { user } = useContext(AuthContext);
  const renderNewTaskRoute = () => {
    return user ? <Route path="/setting/:id" element={<ProfileUser />} /> : null;
  };

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/register-product' element={<RegisterProduct/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/success' element={<Success/>} /> 
        <Route path='/cartshop'element={<CartShop/>} />
        <Route path='/productdetail/:id'element={<ProductDetails/>} />
        <Route path= 'search-category/:subcategory' element={<ProductList/>} />
        <Route path= '/failure' element={<Failure/>} />

        
        {renderNewTaskRoute()}
        <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}

export default Routers