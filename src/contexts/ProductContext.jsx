import {createContext, useContext, useState, useEffect} from 'react';

const ProductContext = createContext();

export function ProductProvider({children}) {
 const [products, setProducts] = useState([]);

   //apply useEffect state method to the product endpoints
  useEffect(() => {
    fetch("http://localhost:4000/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

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

  return (
    <ProductContext.Provider value ={{products, setProducts, handleAddProduct}}>
        {children}
    </ProductContext.Provider>
  )

 
}

 export function useProducts() {
    return useContext(ProductContext);
  }