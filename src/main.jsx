import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import {ProductProvider} from './contexts/ProductContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <CartProvider>
        <UserProvider>
    <App />
    </UserProvider>
    </CartProvider>
    </ProductProvider>
  </StrictMode>,
)