import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Checkout from "./Checkout";
import ThankYou from "./ThankYou";

function MainApp(props) {
  const [cartItems, setCartItems] = useState([]);

  const routing = (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<App cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
              setCartItems={setCartItems}
              
            />
          }
        />
        <Route path="/checkout/finish" element={<ThankYou />} />
      </Routes>
    </Router>
  );

  return routing;
}

export default MainApp;
