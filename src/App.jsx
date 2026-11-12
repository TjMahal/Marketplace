import { useState } from "react";
import Cart from "./components/Cart.jsx";
import NavBar from "./components/NavBar.jsx";
import Sidebar from "./components/SideBar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import AddProductForm from "./components/AddProductForm.jsx";
import { useProducts } from "./contexts/ProductContext.jsx";



function App() {
const { products, handleAddProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);



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


              <ProductCard product={product} />
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
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
