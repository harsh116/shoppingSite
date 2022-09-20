import { useEffect, useState } from "react";
import "./Navigation.scss";
import { BASE_URL, LIST_LIMIT } from "./constants";
import { useNavigate } from "react-router-dom";

function Navigation(props) {
  const [dropdownElements, setDropdownElements] = useState({});
  const { setItems, items, cartItems, setCartItems } = props;
  const [category, setCategory] = useState("categories");
  const [brand, setBrand] = useState("brands");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isBrandDisabled, setIsBrandDisabled] = useState(true);

  const initializeItems = () => {
    fetch(`${BASE_URL}/products?limit=${LIST_LIMIT}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data.products);
      });
  };

  const categoryItems = async () => {
    let res = await fetch(`${BASE_URL}/products/category/${category}`);
    let data = await res.json();
    return data.products;
  };

  const navigate = useNavigate();

  const navigateToCart = () => {
    if (cartItems.length > 0) {
      navigate(`/shoppingSite/checkout`, {
      
      });
    } else {
      alert("Add items in cart first");
    }
  };

  const gettingBrand = (prod) => {
    const tempBrand = [];
   
    let obj = {};
    
    for (let product of prod) {
     

      if (!tempBrand.includes(product.brand.toLowerCase()))
        tempBrand.push(product.brand.toLowerCase());
    }
    setBrands(tempBrand);
    console.log(tempBrand);
  };

  const Option = (props) => {
    const value = props.value;
    return <option value={value}>{value}</option>;
  };

  useEffect(() => {
    fetch(`${BASE_URL}/products/categories`)
      .then((res) => res.json())
      .then((data) => {
        console.log("categories: ", data);
        setCategories(data);
      });
  }, []);

  useEffect(() => {
    if (dropdownElements.brand) {
      dropdownElements.brand.selectedIndex = "0";
    }

    if (!category) {
      return;
    }
    if (category === "categories") {
      setIsBrandDisabled(true);
      initializeItems();
    } else {
      setIsBrandDisabled(false);

      setBrand("brands");

      fetch(`${BASE_URL}/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setItems(data.products);
          gettingBrand(data.products);
        });
    }
  }, [category]);

  useEffect(async () => {
    if (!brand) {
      return;
    }
    let products = await categoryItems();
    if (brand === "brands") {
      setItems(products);
      
    } else {
      

      const filterWithBrands = products.filter(
        (item) => item.brand.toLowerCase() === brand.toLowerCase()
      );

      setItems(filterWithBrands);
    }
  }, [brand]);

  const search = (e) => {
   
    const searchValue = e.target.value;

    if (e.code === "Enter") {
      e.target.value = "";
   
      fetch(`${BASE_URL}/products/search?q=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setItems(data.products);
        });
    }
  };

  const selectCategory = (e) => {
    setDropdownElements({ ...dropdownElements, category: e.target });
    const value = e.target.value;
    console.log(value);
    setCategory(value);
  };

  const selectBrand = (e) => {
    setDropdownElements({ ...dropdownElements, brand: e.target });
    const value = e.target.value;
    console.log(value);
    setBrand(value);
  };

  const reset = () => {
    initializeItems();
    if (dropdownElements.category) {
      dropdownElements.category.selectedIndex = "0";
      setCategory("categories");
    }
    if (dropdownElements.brand) {
      dropdownElements.brand.selectedIndex = "0";
      setBrand("brands");
    }
  };

  const categoryoptions = categories.map((category) => {
   
    return <option value={category}>{category}</option>;
  });

  const brandoptions = brands.map((brand) => {
   
    return <option value={brand}>{brand}</option>;
  });

  return (
    <div className="Navigation">
      <div className="filter">
        <select name="" id="categories" onChange={selectCategory}>
          <option value="categories" selected>
            Categories
          </option>
   
          {categoryoptions}
        </select>
        <select
          name=""
          id="brands"
          onChange={selectBrand}
          disabled={isBrandDisabled}
        >
          <option value="brands" selected>
            Brands
          </option>
   
          {brandoptions}
        </select>
        <div className="reset" onClick={reset}>
          <i class="fa fa-undo" aria-hidden="true"></i> Reset
        </div>
      </div>
      <div className="search">
        <div className="searchSection">
          <span className="searchtext">Search: </span>
          <input type="text" onKeyPress={search} />
        </div>
        <div className="cartBtn">
          <button onClick={navigateToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
