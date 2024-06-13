import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { API_URL } from '../utils/constants';
import { useCart } from '../../context/cart';
import { useParams } from 'react-router-dom';

const ProductList = () => {
    const { subcategory } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/products${subcategory ? `?subcategory=${subcategory}` : ''}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [subcategory]);

    const { addToCart, cart } = useCart();

    return (
        <div>
            <section className="bg-white py-8">
                <div className="container mx-auto pt-4 pb-12">
                    {
                        loading ? (
                            <h1>Loading...</h1>
                        ) : error ? (
                            <h1>{error}</h1>
                        ) : products && products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <h1 className='text-3xl font-semibold'>No hay productos</h1>
                        )
                    }
                </div>
            </section>
        </div>
    );
}

export default ProductList;
