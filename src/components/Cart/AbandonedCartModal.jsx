import { useCart } from '../../context/CartContext';
import styles from './AbandonedCartModal.module.css';

const formatPrice = (n) => `$${n.toFixed(2)}`;

const AbandonedCartModal = () => {
    const {
        showAbandonedModal,
        cart,
        getCartSubtotal,
        discount,
        recoverCart,
        dismissAbandonedModal,
    } = useCart();

    if (!showAbandonedModal) return null;

    const subtotal = getCartSubtotal();
    const savings = subtotal * (discount.percent / 100);
    const total = subtotal - savings;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) dismissAbandonedModal();
    };

    return (
        <div className={styles.modal} onClick={handleOverlayClick}>
            <div className={styles.modalOverlay} />
            <div className={styles.modalContent}>
                <button
                    className={styles.modalClose}
                    onClick={dismissAbandonedModal}
                    aria-label="Close modal"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className={styles.badge}>Limited time</div>

                <div className={styles.header}>
                    <h2>Wait — don't leave just yet!</h2>
                    <p>You still have {cart.length} item{cart.length === 1 ? '' : 's'} waiting in your cart.</p>
                </div>

                <ul className={styles.items}>
                    {cart.slice(0, 3).map((item, idx) => (
                        <li key={`${item.id}-${idx}`} className={styles.item}>
                            <span className={styles.itemName}>{item.name}</span>
                            <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                        </li>
                    ))}
                    {cart.length > 3 && (
                        <li className={styles.itemMore}>+ {cart.length - 3} more</li>
                    )}
                </ul>

                <div className={styles.offer}>
                    <div className={styles.offerLabel}>Use code</div>
                    <div className={styles.offerCode}>{discount.code}</div>
                    <div className={styles.offerDesc}>
                        Get <strong>{discount.percent}% off</strong> when you complete your order now
                    </div>
                </div>

                <div className={styles.summary}>
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className={styles.summaryRowDiscount}>
                        <span>Discount ({discount.percent}%)</span>
                        <span>-{formatPrice(savings)}</span>
                    </div>
                    <div className={styles.summaryRowTotal}>
                        <span>Your price</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                </div>

                <button className={styles.btnPrimary} onClick={recoverCart}>
                    Apply discount & continue
                </button>
                <button className={styles.btnSecondary} onClick={dismissAbandonedModal}>
                    No thanks, maybe later
                </button>
            </div>
        </div>
    );
};

export default AbandonedCartModal;
