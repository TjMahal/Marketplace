import { useUser } from '../contexts/UserContext.jsx'

export default function NavBar({
  searchTerm,
  onSearchChange,
  showForm,
  onToggleForm,
}) {

  const { user } = useUser();

  return (
    <nav className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-white">
      <button className="btn fs-4 p-0" aria-label="Menu">
        ☰
      </button>

      <span className="fs-3 fw-semibold">⬡ framework</span>

      <input
        type="search"
        className="form-control mx-3"
        style={{ maxWidth: "320px" }}
        placeholder="Search products"
        aria-label="Search products"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <div className="d-flex align-items-center gap-3 fs-4">
        {/* NEW: show/hide the add-product form */}
        <button
          type="button"
          className="btn btn-primary btn-sm fs-6"
          onClick={onToggleForm}
        >
          {showForm ? "Hide form" : "Add product"}
        </button>
<div className="d-flex align-items-center gap-2">
        <span role="img" aria-label="Account">
          👤
        </span>
        <div className="fs-6">{user.username}</div>
        <small className="text-muted fs-6">{user.email}</small>
        </div>
        <span role="img" aria-label="Cart">
          🛒
        </span>
      </div>
    </nav>
  );
}
