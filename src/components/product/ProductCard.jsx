import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import { ShoppingCart } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, cart } = useCart();

    const redirectProduct = (id) => {
        navigate(`/productdetail/${id}`);
        console.log(id);
    };


    const handleAddToCart = (product) => {
        const itemstock = cart.items.findIndex((item) => item.id === product.id);
        const productExist = cart.items.find((item) => item.id === product.id);
        console.log('should be add product a cart');

        if (productExist && productExist.quantity === productExist.stock) {
            toast.loading('No es posible agregar al carrito en este momento, ya que no hay más unidades disponibles de este producto en stock.');
            return;
        }

        let selectedSize = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes[0].name : 'default';

        addToCart({ ...product, quantity: 1, selectedSize });
        toast.success('Producto agregado correctamente al carrito!');
    };

    return (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 mx-auto">
            <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
                {
                    product.images.map((image, index) => (
                        <img key={index} className="w-full h-48 object-cover" src={image} alt={product.name} />
                    ))
                }
            </Carousel>

            <div className="p-4">
                <button
                    onClick={() => redirectProduct(product.id)}
                    className="text-xl font-semibold text-gray-900 hover:text-gray-700"

                >
                    {product.name}
                </button>
                <p className="mt-2 text-gray-600">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-gray-900 font-bold text-lg">${product.price}</span>
                    <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-yellow-500 opacity-85"
                        style={{ backgroundColor: 'rgb(255, 204, 41)' }}
                    >
                        <ShoppingCart className="text-white" />
                    </button>
                </div>
                {
                    product.sizes[0].name != 'default' && (
                        <div className="mt-4">
                            <h3 className="text-gray-700">Tallas disponibles:</h3>
                            <div className="flex space-x-2 mt-2">
                                {product.sizes.map(size => (
                                    <span key={size.id} className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold hover:text-yellow-500">
                                        {size.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default ProductCard;
