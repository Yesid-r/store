export const API_URL = "https://uptc-store-efl0z6ol0-yesid-r.vercel.app"
export const API_PAYMENT = "https://uptc-store-efl0z6ol0-yesid-r.vercel.app"
export async function fetchDataFromAPI() {
    const response = await fetch("http://localhost:4000/products");
    
    if (!response.ok) {
      throw new Error("No se pudo obtener la data de productos");
    }
    
    const data = await response.json();
    const productsData = data.dataProducts;
  
    return productsData;
  }

  