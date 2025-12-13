import { useState, useEffect } from 'react';
import { products as productsData } from '../../data/products';
import ProductCard from './ProductCard';
import styles from './Products.module.css';

const Products = ({ activeFilter, setActiveFilter, searchTerm }) => {
    const [filteredProducts, setFilteredProducts] = useState(productsData);

    useEffect(() => {
        let filtered = productsData;

        // Filter by category
        if (activeFilter !== 'all') {
            filtered = filtered.filter(product => product.category === activeFilter);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [activeFilter, searchTerm]);

    const filters = [
        { id: 'all', label: 'All Products' },
        { id: 'laptops', label: 'Laptops' },
        { id: 'gaming', label: 'Gaming PCs' },
        { id: 'accessories', label: 'Accessories' }
    ];

    return (
        <section className={`${styles.productsSection} section`} id="products">
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Featured Products</h2>
                    <p className={styles.sectionSubtitle}>Handpicked selection of our best-selling tech products</p>
                </div>

                <div className={styles.productFilters}>
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.active : ''}`}
                            onClick={() => setActiveFilter(filter.id)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className={styles.productsGrid}>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No products found matching your criteria.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Products;
