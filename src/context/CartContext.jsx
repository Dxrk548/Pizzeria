import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  const addToCart = (pizza) => {
    const existingPizza = cart.find(p => p.name === pizza.name);
    if (existingPizza) {
      setCart(cart.map(p => 
        p.name === pizza.name 
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ));
    } else {
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
  };

  const removeFromCart = (pizzaName) => {
    const existingPizza = cart.find(p => p.name === pizzaName);
    if (existingPizza.quantity > 1) {
      setCart(cart.map(p => 
        p.name === pizzaName 
          ? { ...p, quantity: p.quantity - 1 }
          : p
      ));
    } else {
      setCart(cart.filter(p => p.name !== pizzaName));
    }
  };

  const getTotal = () => {
    return cart.reduce((total, pizza) => total + (pizza.price * pizza.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}