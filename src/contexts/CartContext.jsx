import {createContext, useContext, useState, useEffect} from 'react';

const CartContext = createContext();

export function CartProvider({children}) {
      const [cart, setCart] = useState([]);

      useEffect(() => {
    fetch("http://localhost:4000/cart")
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
      });
  }, []);

    //add items to the cart using POST method
  function addToCart(product) {
    if (cart.some((item) => item.id === product.id)) return;
    fetch("http://localhost:4000/cart", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body:JSON.stringify(product),
    })

    .then((response) => response.json())
    .then((savedItem)=> {
      setCart([...cart, savedItem]);
    });
  }

    //delete items from the cart using DELETE method
  function removeFromCart(id) {
    fetch(`http://localhost:4000/cart/${id}`, {
      method: "DELETE",
    })
    .then(()=> {setCart(cart.filter((item) => item.id !== id))})
    
  }

  return(
    <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
        {children}
    </CartContext.Provider>
  )

}

export function useCart() {
    return useContext(CartContext);
}