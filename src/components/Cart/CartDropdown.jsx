import { useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartDropdown.module.css';

const formatPrice = (n) => `$${n.toFixed(2)}`;

const groupCart = (cart) => {
    const map = new Map();
    for (const item of cart) {
        const existing = map.get(item.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            map.set(item.id, { ...item, quantity: 1 });
        }
    }
    return Array.from(map.values());
};

const CartDropdown = ({ open, onClose, anchorRef }) => {
    const {
        cart,
        incrementItem,
        decrementItem,
        removeFromCart,
        clearCart,
        getCartSubtotal,
        getCartTotal,
        appliedDiscount,
    } = useCart();

    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(e.target) &&
                anchorRef?.current && !anchorRef.current.contains(e.target)
            ) {
                onClose();
            }
        };
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, [open, onClose, anchorRef]);

    if (!open) return null;

    const grouped = groupCart(cart);
    const subtotal = getCartSubtotal();
    const total = getCartTotal();
    const savings = subtotal - total;

    return (
        <div ref={dropdownRef} className={styles.dropdown} role="dialog" aria-label="Shopping cart">
            <div className={styles.header}>
                <h3>Your Cart</h3>
                <span className={styles.count}>
                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
            </div>

            {grouped.length === 0 ? (
                <div className={styles.empty}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <p>Your cart is empty</p>
                    <span>Add some products to get started</span>
                </div>
            ) : (
                <>
                    <ul className={styles.items}>
                        {grouped.map((item) => (
                            <li key={item.id} className={styles.item}>
                                {item.image && (
                                    <div className={styles.thumb}>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                )}
                                <div className={styles.details}>
                                    <div className={styles.name}>{item.name}</div>
                                    <div className={styles.unitPrice}>
                                        {formatPrice(item.price)} <span>each</span>
                                    </div>
                                    <div className={styles.qtyRow}>
                                        <div className={styles.qtyControls}>
                                            <button
                                                onClick={() => decrementItem(item.id)}
                                                aria-label={`Decrease quantity of ${item.name}`}
                                            >−</button>
                                            <span className={styles.qty}>{item.quantity}</span>
                                            <button
                                                onClick={() => incrementItem(item.id)}
                                                aria-label={`Increase quantity of ${item.name}`}
                                            >+</button>
                                        </div>
                                        <div className={styles.lineTotal}>
                                            {formatPrice(item.price * item.quantity)}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className={styles.remove}
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label={`Remove ${item.name}`}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"></path>
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.summary}>
                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        {appliedDiscount && (
                            <div className={styles.summaryDiscount}>
                                <span>Discount ({appliedDiscount.code})</span>
                                <span>-{formatPrice(savings)}</span>
                            </div>
                        )}
                        <div className={styles.summaryTotal}>
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.btnSecondary} onClick={clearCart}>
                            Clear cart
                        </button>
                        <button className={styles.btnPrimary} onClick={onClose}>
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartDropdown;
