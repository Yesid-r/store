import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../utils/constants';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState({});
    const { addToCart, cart } = useCart();
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL}/products/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo cargar el producto');
                }
                const data = await response.json();
                setProduct(data.data);
                console.log(data.data)
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
    const handleSearchCategory = (category) => {
        navigate(`/search-category/${category}`)
    }
    const handleSearchSubCategory = (subcategory) => {
        navigate(`/subcategory/${subcategory}`)
    }

    const handleAddToCart = (product) => {
        const itemstock = cart.items.findIndex((item) => item.id === product.id);
        const productExist = cart.items.find((item) => item.id === product.id);
        console.log('should be add product a cart')

        if (productExist && productExist.quantity === productExist.stock) {
            toast.loading('No es posible agregar al carrito en este momento, ya que no hay más unidades disponibles de este producto en stock.');
            return;
        }

        addToCart({
            ...product, quantity
        });

        toast.success('Producto agregado correctamente al carrito!');
    };

    return (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
            <div className="grid gap-4">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                />
            </div>
            <div className="grid gap-4 md:gap-10 items-start">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => { handleSearchCategory(product.category.name)}}
                            className="text-sm font-medium text-gray-500 hover:text-yellow-500"
                        >
                            {product.category.name}
                        </button>
                        <span className="text-gray-400 dark:text-gray-600">/</span>
                        <button
                            onClick={() => {handleSearchSubCategory(product.subCategory.name)}}
                            className="text-sm font-medium text-gray-500 hover:text-yellow-500"
                        >
                            {product.subCategory.name}
                        </button>
                    </div>
                    <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
                </div>
                <div className="grid gap-4">
                    <div className="prose prose-stone">
                        <p>
                            {product.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold">${product.price}</div>
                    </div>
                </div>
                <form className="grid gap-4 md:gap-10">
                    <div className="grid gap-2">
                        <label htmlFor="size" className="text-base">
                            Size
                        </label>
                        <div id="size" className="flex items-center gap-2">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <label
                                    key={size}
                                    htmlFor={`size-${size.toLowerCase()}`}
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 bg-white "
                                >
                                    <input
                                        type="radio"
                                        id={`size-${size.toLowerCase()}`}
                                        name="size"
                                        value={size.toLowerCase()}
                                        className="hidden"
                                    />
                                    {size}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="quantity" className="text-base">
                            Quantity
                        </label>
                        <select
                            id="quantity"
                            name="quantity"
                            defaultValue="1"
                            className="w-24 p-2 border rounded-md"
                            onChange={(e) => {setQuantity(parseInt(e.target.value, 10))}}
                        >
                            {[1, 2, 3, 4, 5].map((qty) => (
                                <option key={qty} value={qty}>
                                    {qty}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button onClick={() => {handleAddToCart(product)}}
                        type="button"
                        className="flex items-start justify-center bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 opacity-85"
                    >
                        <ShoppingCart className='mr-2'/>
                        Add to cart
                    </button>
                </form>
            </div>
        </div>
    );

};

export default ProductDetails;
