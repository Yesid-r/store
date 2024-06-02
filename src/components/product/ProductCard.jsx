import React from 'react';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';

const ProductCard = ({ data }) => {
  const { addToCart, cart } = useCart();
  const { _id, name, price, images } = data;

  const handleAddToCart = (product) => {
    const productExist = cart.items.find((item) => item._id === product._id);

    if (productExist && productExist.quantity === productExist.stock) {
      toast.error('No es posible agregar al carrito en este momento, ya que no hay más unidades disponibles de este producto en stock.');
      return;
    }

    addToCart({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.images.secure_url,
      stock: product.stock,
      quantity: 1,
    });
    toast.success('Producto agregado correctamente al carrito!');
  };

  return (
    <div className=" p-6 flex flex-col rounded-md shadow-md">
      <a href={`/productdetail/${_id}`}>
        <img
          className="mx-auto w-72 h-72 rounded-lg shadow-xl hover:shadow-2xl"
          src={images.secure_url}
          alt={name}
        />
      </a>
      <div className="pt-3 grid col-end-1">
        <a href={`/productdetail/${_id}`} className="mx-auto font-semibold">
          {name}
        </a>
        <p className="text-gray-900 mx-auto">${price}</p>
      </div>
      <button
        className="mx-auto px-8 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 flex items-center mt-2"
        onClick={() => handleAddToCart(data)}
      >
        <svg
          className="h-5 w-5 mr-1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductCard;
