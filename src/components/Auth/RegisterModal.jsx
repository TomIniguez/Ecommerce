import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import styles from './LoginModal.module.css';

const RegisterModal = () => {
    const { showRegisterModal, closeRegisterModal, switchToLogin, register } = useAuth();
    const { showNotification } = useCart();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!showRegisterModal) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        const result = register(name, email, password);
        showNotification(result.message, result.success ? 'success' : 'error');

        if (result.success) {
            setName('');
            setEmail('');
            setPassword('');
        }
    };

    const handleClose = () => {
        closeRegisterModal();
        setName('');
        setEmail('');
        setPassword('');
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div className={styles.modal} onClick={handleOverlayClick}>
            <div className={styles.modalOverlay} />
            <div className={styles.modalContent}>
                <button className={styles.modalClose} onClick={handleClose} aria-label="Close modal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className={styles.modalHeader}>
                    <h2>Create Account</h2>
                    <p>Join Shopily and start shopping today!</p>
                </div>

                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="registerName">Full Name</label>
                        <input
                            type="text"
                            id="registerName"
                            className={styles.formInput}
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="registerEmail">Email Address</label>
                        <input
                            type="email"
                            id="registerEmail"
                            className={styles.formInput}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="registerPassword">Password</label>
                        <input
                            type="password"
                            id="registerPassword"
                            className={styles.formInput}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                            minLength="6"
                        />
                    </div>

                    <button type="submit" className={styles.btnPrimary}>
                        Create Account
                    </button>

                    <div className={styles.formFooter}>
                        <p>
                            Already have an account?{' '}
                            <a href="#" onClick={(e) => { e.preventDefault(); switchToLogin(); }} className={styles.linkPrimary}>
                                Login here
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;
