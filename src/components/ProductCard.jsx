import { useCart } from "../contexts/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

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
      </div>
    </div>
  );
}