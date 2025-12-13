import { useCart } from '../../context/CartContext';
import styles from './Products.module.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <article className={styles.card}>
            <div className={styles.cardImage}>
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.badge && <span className={styles.cardBadge}>{product.badge}</span>}
            </div>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardDescription}>{product.description}</p>
                <div className={styles.cardPrice}>${product.price.toFixed(2)}</div>
                <div className={styles.cardFooter}>
                    <button
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>
                    <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
                        Details
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
