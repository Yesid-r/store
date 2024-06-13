import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate()

    const redirectProduct= (id) =>{
        //TODO will be directed to details component
        navigate(`/productdetail/${id}`)
        console.log(id)
    }
  
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img className="w-full h-48 object-cover" src={product.images[0]} alt={product.name} />
            <div className="p-4">
                <button onClick={() => {redirectProduct(product.id)}} className="text-xl font-semibold text-gray-900">{product.name}</button>
                <p className="mt-2 text-gray-600">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-gray-900 font-bold text-lg">${product.price}</span>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">Agregar al carrito</a>
                </div>
                <div className="mt-4">
                    <h3 className="text-gray-700">Tallas disponibles:</h3>
                    <div className="flex space-x-2 mt-2">
                        {product.sizes.map(size => (
                            <span key={size.id} className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">{size.name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
