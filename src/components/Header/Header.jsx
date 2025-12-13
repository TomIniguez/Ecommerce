import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.css';

const Header = ({ searchTerm, setSearchTerm }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { getCartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <nav className={`${styles.nav} container`}>
                <a href="#home" className={styles.logo} onClick={closeMobileMenu}>
                    🛒 Shopily
                </a>

                <ul className={`${styles.navMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
                    <li><a href="#home" className={styles.navLink} onClick={closeMobileMenu}>Home</a></li>
                    <li><a href="#products" className={styles.navLink} onClick={closeMobileMenu}>Products</a></li>
                    <li><a href="#categories" className={styles.navLink} onClick={closeMobileMenu}>Categories</a></li>
                    <li><a href="#about" className={styles.navLink} onClick={closeMobileMenu}>About</a></li>
                    <li><a href="#contact" className={styles.navLink} onClick={closeMobileMenu}>Contact</a></li>
                </ul>

                <div className={styles.navActions}>
                    <div className={styles.searchBar}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input
                            type="search"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search products"
                        />
                    </div>

                    <button className={styles.cartIcon} aria-label="Shopping cart">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        {getCartCount() > 0 && <span className={styles.cartBadge}>{getCartCount()}</span>}
                    </button>

                    <button
                        className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.active : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
