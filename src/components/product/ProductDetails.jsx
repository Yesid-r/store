import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../utils/constants';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);
    const { addToCart, cart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL}/products/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo cargar el producto');
                }
                const data = await response.json();
                setProduct(data.dataProduct);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleAddToCart = (product) => {
        const itemstock = cart.items.findIndex((item) => item._id === product._id);
        const productExist = cart.items.find((item) => item._id === product._id);

        if (productExist && productExist.quantity === productExist.stock) {
            toast.loading('No es posible agregar al carrito en este momento, ya que no hay más unidades disponibles de este producto en stock.');
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
        <div className="container mt-3 mx-auto px-6">
            <div className="md:flex md:items-center">
                <div className="w-full h-64 md:w-1/2 lg:h-96">
                    <img
                        className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
                        src={product.images.secure_url}
                        alt={product.name}
                    />
                </div>
                <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                    <h3 className="text-gray-700 uppercase text-lg">{product.name}</h3>
                    <span className="text-gray-500 mt-3">${product.price}</span>
                    <hr className="my-3" />
                    <div className="mt-2">
                        <div className="flex items-center mt-1">
                            <span className="text-gray-700 text-lg mx-2">Stock:</span>
                            <span className="text-gray-700 text-lg mx-2">{product.stock}</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <label className="text-gray-700 text-sm" htmlFor="count">
                            Categoria:
                        </label>
                        <div className="flex items-center mt-1">
                            <span className="text-gray-700 text-lg mx-2">{product.subcategory}</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <label className="text-gray-700 text-sm" htmlFor="count">
                            Descripción:
                        </label>
                        <div className="flex items-center mt-1">
                            <span className="text-gray-700 text-lg mx-2">{product.description}</span>
                        </div>
                    </div>
                    <div className="flex items-center mt-6">
                        <button
                            className="px-8 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 flex items-center"
                            onClick={() => handleAddToCart(product)}
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
                </div>
            </div>
            <div className="mt-16">
                <h3 className="text-gray-600 text-2xl font-medium">More Products</h3>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"></div>
            </div>
        </div>
    );
};

export default ProductDetails;
