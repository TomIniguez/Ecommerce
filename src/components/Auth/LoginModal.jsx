import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import styles from './LoginModal.module.css';

const LoginModal = () => {
    const { showLoginModal, closeLoginModal, switchToRegister, login } = useAuth();
    const { showNotification } = useCart();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!showLoginModal) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        const result = login(email, password);
        showNotification(result.message, result.success ? 'success' : 'error');

        if (result.success) {
            setEmail('');
            setPassword('');
        }
    };

    const handleClose = () => {
        closeLoginModal();
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
                    <h2>Welcome Back!</h2>
                    <p>Login to your account to continue shopping</p>
                </div>

                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="loginEmail">Email Address</label>
                        <input
                            type="email"
                            id="loginEmail"
                            className={styles.formInput}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="loginPassword">Password</label>
                        <input
                            type="password"
                            id="loginPassword"
                            className={styles.formInput}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className={styles.btnPrimary}>
                        Login
                    </button>

                    <div className={styles.formFooter}>
                        <p>
                            Don't have an account?{' '}
                            <a href="#" onClick={(e) => { e.preventDefault(); switchToRegister(); }} className={styles.linkPrimary}>
                                Register here
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
