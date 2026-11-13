import { useCart } from "../contexts/CartContext.jsx";
import { useProducts } from "../contexts/ProductContext.jsx";
import {useState} from 'react';


export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const {updateProduct, deleteProduct} = useProducts();
  const [newPrice, setNewPrice] = useState("");



  //price update handler function
  function handleUpdate() {
    if(newPrice === "") return;

    const formatted = `$${Number(newPrice).toLocaleString("en-US")}`;

    updateProduct(product.id, {price:formatted});
    setNewPrice("");
  }

  function handleDelete() {
    const ok = window.confirm(`Delete "${product.name}"?`);
    if(!ok) return;
    deleteProduct(product.id);
  }



  return (
    <div className="card h-100 border-0">
      <img
        src={product.image}
        className="card-img-top rounded"
        alt={product.name}
        style={{ height: "300px", objectFit: "cover", opacity: product.available ? 1 : 0.4 }}
      />

      <div className="card-body px-0">
        <h6 className="card-title">{product.name}</h6>

        {product.available ? (
          <p className="text-muted">Starting at {product.price}</p>
        ) : (
          <p className="text-danger fw-bold">Not available</p>
        )}

        <button
          className="btn btn-dark btn-sm me-auto"
          disabled={!product.available}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        
      
        <input type="number" className="form-control form-control-sm mt-2" placeholder="New price" value={newPrice} onChange={(event)=> setNewPrice(event.target.value)} /> 
        <button className="btn btn-outline-secondary btn-sm mt-2" onClick={handleUpdate}>Update price</button>

        <button className="btn btn-outline-danger btn-sm mt-2" onClick={handleDelete}>Delete Product</button>
      </div>
    </div>
  );
}