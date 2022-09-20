import { useState, Fragment, useEffect } from "react";
import "./Checkout.scss";
import { useNavigate } from "react-router-dom";

const CartRow = (props) => {
  const { cartItem, cartItems, setCartItems, render, setrender } = props;
  const { id, title, thumbnail, price, qty } = cartItem;
  const [qtyState, setQtyState] = useState(1);

  useEffect(() => {
    setQtyState(qty);
  }, []);

  useEffect(() => {
    setrender(render + 1);
  }, [qtyState]);

  const removeCart = () => {
    console.log(cartItem);
    let tempCartItems = cartItems;
    tempCartItems = tempCartItems.filter((ele) => ele.id !== id);

    setCartItems(tempCartItems);
    setrender(render + 1);
    console.log("cartitems: ", tempCartItems);
  };

  const updateQty = (type) => {
    if (type === 1) {
      if (qtyState < cartItem.stock) setQtyState(qtyState + 1);
    } else {
      setQtyState(qtyState - 1);
    }
  };

  useEffect(() => {
    if (qtyState <= 0) {
      removeCart();
    } else {
      let tempCartItems = cartItems;
      const ind = tempCartItems.findIndex((ele) => ele.id === id);
      tempCartItems[ind]["qty"] = qtyState;
      setCartItems(tempCartItems);
      
    }
  }, [qtyState]);

  

  return (
    <Fragment>
      <div className="product">
        <button onClick={removeCart}>{`\u00d7`}</button>
        <img src={thumbnail} alt="image" />
        <span>{title}</span>
      </div>
      <div className="price">
        <span>{"$" + price}</span>
      </div>
      <div className="quantity">
        <div className="pill">
          <button
            onClick={() => {
              updateQty(2);
            }}
            className="decrement"
          >
            {"\u2212"}
          </button>
          <span>{qtyState}</span>
          <button
            onClick={() => {
              updateQty(1);
            }}
            className="increment"
          >
            {"\u002B"}
          </button>
        </div>
      </div>
      <div className="subtotal">
        <span>{"$" + qtyState * price}</span>
      </div>
    </Fragment>
  );
};

function Checkout(props) {
 
  const { cartItems, setCartItems } = props;
  const [render, setrender] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let totalPrice = 0;
    for (let item of cartItems) {
      totalPrice += item.qty * item.price;
    }
    setTotal(totalPrice);
    console.log("totalprice:  ", totalPrice);
  }, [render]);

  const itemComponents = cartItems.map((cartItem) => {
    return (
      <CartRow
        key={cartItem.id}
        cartItem={cartItem}
        cartItems={cartItems}
        setCartItems={setCartItems}
        render={render}
        setrender={setrender}
      />
    );
  });

  return (
    <div className="Checkout">
      <div className="itemSection">
        <div className="header">Product</div>
        <div className="header">Price</div>
        <div className="header">Quantity</div>
        <div className="header">Subtotal</div>

        {itemComponents}
      </div>
      <div className="cartSection">
        <h3>Cart totals</h3>
        <div className="subtotalSection">
          <div className="subtotalHeader">SubTotal</div>
         
          <div className="subtotalValue">{`$${total ? total : 0}`}</div>
        </div>
        <div className="totalSection">
          <div className="totalHeader">Total</div>
          
          <div className="totalValue">{`$${total ? total : 0}`}</div>
        </div>
        <button
          onClick={() => {
            navigate("/checkout/finish");
          }}
          className="proceed"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
}

export default Checkout;
