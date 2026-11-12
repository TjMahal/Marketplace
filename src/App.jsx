import { useState, useEffect } from "react";
import Cart from "./components/Cart.jsx";

// import productImage1 from "./assets/frameworklaptop12.webp";
// import productImage2 from "./assets/frameworklaptop12diy.webp";
// import productImage3 from "./assets/frameworklaptop13pro.webp";
// import productImage4 from "./assets/frameworklaptop13prodiy.webp";
// import productImage5 from "./assets/frameworklaptop16.webp";
// import productImage6 from "./assets/frameworklaptop16diy.webp";
// import productImage7 from "./assets/frameworklaptop12diy(13thgen).webp";
// import productImage8 from "./assets/frameworklaptop13diyedition.webp";
// import productImage9 from "./assets/frameworklaptop13pro.webp";

import NavBar from "./components/NavBar.jsx";
import Sidebar from "./components/SideBar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import AddProductForm from "./components/AddProductForm.jsx";

// const initialProducts = [
//   {
//     id: 1,
//     name: "Framework Laptop 13 Pro DIY Edition (Intel® Core™ Ultra Series 3)",
//     price: "$1,199",
//     available: true,
//     image: productImage4,
//   },
//   {
//     id: 2,
//     name: "Framework Laptop 13 Pro (AMD Ryzen™ AI 300 Series)",
//     price: "$2,299",
//     available: true,
//     image: productImage1,
//   },
//   {
//     id: 3,
//     name: "Framework Laptop 13 Pro (Intel® Core™ Ultra Series 3)",
//     price: "$1,599",
//     available: false,
//     image: productImage3,
//   },
//   {
//     id: 4,
//     name: "Framework Laptop 16 (AMD Ryzen™ AI 300 Series)",
//     price: "$1,839",
//     available: true,
//     image: productImage5,
//   },
//   {
//     id: 5,
//     name: "Framework Laptop 16 DIY Edition (AMD Ryzen™ AI 300 Series)",
//     price: "$1,249",
//     available: true,
//     image: productImage6,
//   },
//   {
//     id: 6,
//     name: "Framework Laptop 12 DIY Edition (13th Gen Intel® Core™)",
//     price: "$499",
//     available: false,
//     image: productImage2,
//   },
//   {
//     id: 7,
//     name: "Framework Laptop 12 DIY Edition (13th Gen Intel® Core™)",
//     price: "$499",
//     available: false,
//     image: productImage7,
//   },
//   {
//     id: 8,
//     name: "Framework Laptop 13 DIY Edition (Intel® Core™ Ultra Series 3)",
//     price: "$1,199",
//     available: true,
//     image: productImage8,
//   },
//   {
//     id: 9,
//     name: "Framework Laptop 13 Pro (Intel® Core™ Ultra Series 3)",
//     price: "$1,599",
//     available: true,
//     image: productImage9,
//   },
// ];

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  //apply useEffect state method to the product and cart endpoints
  useEffect(() => {
    fetch("http://localhost:4000/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

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

// add products to the productList using POST, set image as a placeholder image if no image is provided in the form
  function handleAddProduct(formData) {
    const newProduct = {
      // id: Date.now(), //JSON server already assigns ids to new products
      name: formData.name,
      description: formData.description,
      price: `$${formData.price.toLocaleString("en-US")}`,
      image: formData.image || "/placeholder.webp",
      available: formData.available,
    };

     fetch("http://localhost:4000/product", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body:JSON.stringify(newProduct),
    })

    .then((response) => response.json())
    .then((savedProduct) => {
  setProducts((prev) => [...prev, savedProduct]);
});
    

  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <NavBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showForm={showForm}
        onToggleForm={() => setShowForm((prev) => !prev)}
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <Sidebar />
          </div>

          <div className="col-sm-7 p-4">
            <h2>
              Framework Laptop{" "}
              <small className="text-muted fs-6">
                / {filteredProducts.length} items
              </small>
            </h2>

            {showForm && <AddProductForm onAddProduct={handleAddProduct} />}

            <div className="row row-cols-3 g-3 mt-2">
              {filteredProducts.map((product) => (
                <div className="col" key={product.id}>
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    available={product.available}
                    onAdd={() => addToCart(product)}
                  />
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="text-muted mt-4">
                No products match "{searchTerm}".
              </p>
            )}
          </div>

          <div className="col-sm-3">
            <Cart items={cart} onRemove={removeFromCart} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
