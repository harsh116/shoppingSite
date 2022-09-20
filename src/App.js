import { useState, useEffect, useRef } from "react";
import "./App.css";
import Navigation from "./Navigation";
import List from "./List";

import { BASE_URL, LIST_LIMIT } from "./constants";


function App(props) {
 
  const [items, setItems] = useState([]);
  
  const { cartItems, setCartItems } = props;

  useEffect(() => {
    fetch(`${BASE_URL}/products?limit=${LIST_LIMIT}`)
      .then((res) => res.json())
      .then((data) => {
       
        setItems(data.products);
      });
  }, []);

  return (
    <div className="App">
      <Navigation
        setItems={setItems}
        items={items}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <List
        items={items}
        cartItems={cartItems}
        setCartItems={setCartItems}
        setItems={setItems}
      />
    </div>
  );
}

export default App;
