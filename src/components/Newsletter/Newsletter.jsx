import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Newsletter.module.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const { showNotification } = useCart();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateEmail(email)) {
            showNotification('Thank you for subscribing! Check your email for exclusive deals.', 'success');
            setEmail('');
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    };

    return (
        <section className={`${styles.newsletterSection} section`} id="contact">
            <div className="container">
                <div className={styles.newsletterContent}>
                    <h2 className={styles.sectionTitle}>Stay Updated</h2>
                    <p className={styles.sectionSubtitle}>
                        Subscribe to our newsletter for exclusive deals, new arrivals, and tech news
                    </p>

                    <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className={styles.newsletterInput}
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Email address"
                        />
                        <button type="submit" className={styles.btnPrimary}>
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
