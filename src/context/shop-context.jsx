import { createContext, useEffect, useState } from "react";
import { API_URL } from "../utils/constants";

const fetchDataFromAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data.dataProducts;
  } catch (error) {
    throw new Error("Error al cargar productos desde la API: " + error.message);
  }
};

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  return {};
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Cargar productos cuando el componente se monta
    fetchDataFromAPI()
      .then((data) => {
        setProducts(data);
        setCartItems(getDefaultCart());
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []); // [] como segundo argumento para que se ejecute solo una vez

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 0) {
        updatedCart[itemId]--;
      }
      return updatedCart;
    });
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[itemId] = newAmount;
      return updatedCart;
    });
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
