import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/cart';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <AuthContextProvider>
      <BrowserRouter>
      
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </AuthContextProvider>
  </CartProvider>


);
