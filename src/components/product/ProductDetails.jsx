import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../utils/constants';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const ProductDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState({});
    const { addToCart, cart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL}/products/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo cargar el producto');
                }
                const data = await response.json();
                setProduct(data.data);
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
        navigate(`/search-category/${category}`);
    };

    const handleSearchSubCategory = (subcategory) => {
        navigate(`/sub-category/${subcategory}`);
    };

    const handleAddToCart = (product) => {
        const itemstock = cart.items.findIndex(
            (item) => item.id === product.id && item.selectedSize === selectedSize
        );
        const productExist = cart.items.find(
            (item) => item.id === product.id && item.selectedSize === selectedSize
        );
        console.log('should be add product a cart');

        if (productExist && productExist.quantity === productExist.stock) {
            toast.loading(
                'No es posible agregar al carrito en este momento, ya que no hay más unidades disponibles de este producto en stock.'
            );
            return;
        }


        if (Array.isArray(product.sizes) && product.sizes[0].name != 'default' && !selectedSize) {
            toast.error('Por favor, selecciona una talla.');
            return;
        }

        addToCart({
            ...product,
            quantity,
            selectedSize: (product.sizes[0].name == 'default'? 'default': selectedSize),
        });

        toast.success('Producto agregado correctamente al carrito!');
    };


    return (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
            <div className="grid gap-4">
                <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
                    {product.images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={image}
                                alt={product.name}
                                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className="grid gap-4 md:gap-10 items-start">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => { handleSearchCategory(product.category.name); }}
                            className="text-sm font-medium text-gray-500 hover:text-yellow-500"
                        >
                            {product.category.name}
                        </button>
                        <span className="text-gray-400 dark:text-gray-600">/</span>
                        <button
                            onClick={() => { handleSearchSubCategory(product.subCategory.name); }}
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

                    {
                        Array.isArray(product.sizes) && product.sizes.length > 0 && product.sizes[0].name != 'default' && (
                            <div className="grid gap-2">
                                <label htmlFor="size" className="text-base">
                                    Talla
                                </label>
                                <select
                                    id="size"
                                    name="size"
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                    className="p-2 border rounded-md"
                                >
                                    <option value="" disabled>Selecciona una talla</option>
                                    {product.sizes.map((size) => (
                                        <option key={size.id} value={size.name}>
                                            {size.name}
                                        </option>
                                    ))}
                                </select>
                            </div>)
                    }

                    <div className="grid gap-2">
                        <label htmlFor="quantity" className="text-base">
                            Cantidad
                        </label>
                        <select
                            id="quantity"
                            name="quantity"
                            defaultValue="1"
                            className="w-24 p-2 border rounded-md"
                            onChange={(e) => { setQuantity(parseInt(e.target.value, 10)); }}
                        >
                            {[1, 2, 3, 4, 5].map((qty) => (
                                <option key={qty} value={qty}>
                                    {qty}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={() => { handleAddToCart(product); }}
                        type="button"
                        className="flex items-start justify-center bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 opacity-85"
                    >
                        <ShoppingCart className='mr-2' />
                        Añadir al carrito
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductDetails;
