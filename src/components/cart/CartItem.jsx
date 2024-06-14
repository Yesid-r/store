import React from 'react'
import { useCart } from '../../context/cart';

const CartItem = ({ item }) => {

    const { product } = item

    const { removeFromCart } = useCart();
    const handleRemove = () => {
        removeFromCart(item);
    };

    return (
        <div className="flex justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={product.images[0]} alt={product.name} className="w-40 h-40 object-cover rounded-lg sm:w-40 sm:h-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <a href={`/productdetail/${product.id}`} className="text-lg font-bold text-gray-900">{product.name}</a>
                    <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">Cantidad</h2>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 ml-3">
                            <p className="text-sm font-bold text-gray-900">{product.quantity}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">{product.price} $ COP</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={handleRemove}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CartItem