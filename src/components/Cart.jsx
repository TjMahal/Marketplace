import { useCart } from "../contexts/CartContext.jsx";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-3 border-start h-100">
      <h5>Cart ({cart.length})</h5>
      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty</p>
      ) : (
        <ul className="list-group list-group-flush">
          {cart.map((item) => (
            <li key={item.id} className="list-group-item px-0 d-flex align-items-center gap-2">
              <img
                src={item.image}
                alt={item.name}
                className="rounded"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <div className="small">{item.name}</div>
                <div className="text-muted small">{item.price}</div>
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}