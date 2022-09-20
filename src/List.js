import { useState, useEffect, Fragment } from "react";
import "./List.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Row = (props) => {
  const [qtyState, setQtyState] = useState(0);
  const [checkedState, setCheckedState] = useState(false);

  const {
    image,
    name,
    rating,
    stock,
    price,
    isblank,
    id,
    setInputElements,
    inputElements,
    cartItems,
    setCartItems,
    items,
    description,
  } = props;

  useEffect(() => {
    
    if (!cartItems) return;
    const cartitem = cartItems.find((ele) => ele.id === id);
    if (cartitem) {
      setQtyState(cartitem.qty);
      setCheckedState(true);
    } else {
      setQtyState(0);
      setCheckedState(false);
    }
  }, [cartItems, items]);

  

  const Buyoption = (props) => {
    

    const gettingElement = (e) => {
      const qty = Number(e.target.value);
      if (qty <= 0) {
        setCheckedState(false);
      } else if (qty > stock) {
        setCheckedState(false);
        setQtyState(stock);
        return;
      } else {
        if (checkedState) {
          const tempCartItems = cartItems;
          const cartIndex = tempCartItems.findIndex((ele) => ele.id === id);
          tempCartItems[cartIndex]["qty"] = qty;
          setCartItems(tempCartItems);
          console.log("cartitems: ", tempCartItems);
        }
      }
      setQtyState(qty);
      console.log("items: ", items);
      const idArray = inputElements.map((ele) => ele.id);
      if (!idArray.includes(id)) {
        console.log("idarray: ", idArray);
        console.log("inputelemt: ", inputElements);
       
        const tempelements = [...inputElements, { id, target: e.target }];
        setInputElements(tempelements);
      }
      console.log([...inputElements, { id, target: e.target }]);
    };

    const checkboxFn = (e) => {
      const checkedState1 = e.target.checked;
      setCheckedState(checkedState1);
      console.log("checkedState: ", checkedState1);

      const cartIDArray = cartItems.map((ele) => ele.id);
      
      const selectedItem = items.find((ele) => ele.id === id);
      
      const value = qtyState;
      if (value > 0) {
        selectedItem["qty"] = value;
        
        if (checkedState1 && !cartIDArray.includes(id)) {
          setCartItems([...cartItems, selectedItem]);
          console.log("cartitems: ", [...cartItems, selectedItem]);
          return;
        }

        
        if (!checkedState1 && cartIDArray.includes(id)) {
          let carts = cartItems.filter((ele) => ele.id !== id);
          setCartItems(carts);
          console.log("cartitems: ", carts);
        }
      }
     
    };

    return (
      <Fragment>
        <input
          className="inputQty"
          type="number"
          name=""
          id=""
          defaultValue={qtyState}
          onChange={gettingElement}
        />
        <div className="cartIcon">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </div>
        <input
          type="checkbox"
          name=""
          id=""
          onChange={checkboxFn}
          checked={checkedState}
        />
      </Fragment>
    );
  };

  const BlankBuyOption = (props) => {
    return <div className="hr"></div>;
  };

  

  return (
    <Fragment>
      <div className="image">{!isblank ? <img src={image} alt="" /> : ""}</div>

      <div className="name">
        <Tippy
          content={
            <div className="overlay">
              <span>{description}</span>
            </div>
          }
          arrow={true}
          duration={500}
          interactive={true}
          placement={"right"}
         
        >
          <span>{name}</span>
        </Tippy>
      </div>

      <div className="rating">
        {!isblank ? parseFloat(rating).toFixed(2) : ""}
      </div>
      <div className="stock">{stock}</div>
      <div className="price">{!isblank ? `$${price}` : ""}</div>
      <div className="buyoption">
        {isblank ? (
          <BlankBuyOption />
        ) : (
          <Buyoption
            id={id}
            setInputElements={setInputElements}
            inputElements={inputElements}
          />
        )}
      </div>
    </Fragment>
  );
};

function List(props) {
  const { items, cartItems, setCartItems, setItems } = props;
  
  const [inputElements, setInputElements] = useState([]);

  
  const temparray = [];
  

  for (let i = 0; i < items.length; i++) {
    const id = items[i].id;
    const image = items[i].thumbnail;
    const name = items[i].title;
    const rating = items[i].rating;
    const stock = items[i].stock;
    const price = items[i].price;
    const description = items[i].description;
    

    temparray.push(
      <Row
        key={id}
        id={id}
        name={name}
        image={image}
        rating={rating}
        stock={stock}
        price={price}
        isblank={false}
        setInputElements={setInputElements}
        inputElements={inputElements}
        cartItems={cartItems}
        setCartItems={setCartItems}
        items={items}
        description={description}
        
      />
    );

    if (i % 2 === 1) {
      temparray.push(<Row isblank={true} />);
    }
  }

  console.log("temparray: ", temparray);


  return (
    <div className="List">
      <div className="header">Image</div>

      <div className="header">Name</div>
      <div className="header">Rating</div>
      <div className="header">Stock</div>
      <div className="header">Price</div>
      <div className="header buy">
        <span>Buy</span>
      </div>
      
      {temparray}
    </div>
  );
}

export default List;
