import { createContext, useContext, useEffect, useReducer } from "react";


const initialCartState = {
  items: [],
  total: 0,
};


export const CartContext = createContext();


const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":

      const existingItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex !== -1 ) {

        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;

        return {
          ...state,
          items: updatedItems,
          total:
            state.total + action.payload.price * action.payload.quantity,
        };
      } else {

        return {
          ...state,
          items: [...state.items, action.payload],
          total:
            state.total + action.payload.price * action.payload.quantity,
        };
      }

    case "REMOVE_FROM_CART":

      const updatedItems = state.items.filter(
        (item) => item._id !== action.payload._id
      );

      return {
        ...state,
        items: updatedItems,
        total:
          state.total - action.payload.price * action.payload.quantity,
      };

    case "CLEAR_CART":

      return {
        ...state,
        items: [],
        total: 0,
      };

    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,

        JSON.parse(localStorage.getItem("cart")) || initialCartState
      );
    

      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartState));
      }, [cartState]);

  return (
    <CartContext.Provider
      value={{
        cart: cartState,
        addToCart: (item) =>
          dispatchCartAction({ type: "ADD_TO_CART", payload: item }),
        removeFromCart: (item) =>
          dispatchCartAction({ type: "REMOVE_FROM_CART", payload: item }),
        clearCart: () => dispatchCartAction({ type: "CLEAR_CART" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  return useContext(CartContext);
};
