import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../utils/constants';

const ProductList = () => {
    const { category, subcategory } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let query = `${API_URL}/api/products?`;
                
                if (category) query += `category=${category}&`;
                if (subcategory) query += `subcategory=${subcategory}&`;
                if (searchTerm) query += `name=${searchTerm}&`;

                const response = await fetch(query.slice(0, -1)); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(Array.isArray(data.data) ? data.data : []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, subcategory, searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <section className="bg-white py-8">
                <div className="container mx-auto pt-4 pb-12">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>

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
};

export default ProductList;
