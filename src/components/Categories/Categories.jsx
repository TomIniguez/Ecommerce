import { categories } from '../../data/products';
import styles from './Categories.module.css';

const Categories = ({ setActiveFilter }) => {
    const handleCategoryClick = (filter) => {
        setActiveFilter(filter);
        // Scroll to products section
        const productsSection = document.getElementById('products');
        if (productsSection) {
            const headerOffset = 80;
            const elementPosition = productsSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="section" id="categories">
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Shop by Category</h2>
                    <p className={styles.sectionSubtitle}>Find exactly what you're looking for</p>
                </div>

                <div className={styles.categoriesGrid}>
                    {categories.map(category => (
                        <div
                            key={category.id}
                            className={styles.categoryCard}
                            onClick={() => handleCategoryClick(category.filter)}
                        >
                            <div className={styles.categoryContent}>
                                <div className={styles.categoryIcon}>{category.icon}</div>
                                <h3 className={styles.categoryName}>{category.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
