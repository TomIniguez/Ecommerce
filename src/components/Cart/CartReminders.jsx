import { useCart } from '../../context/CartContext';
import styles from './CartReminders.module.css';

const CartReminders = () => {
    const { reminders, dismissReminder } = useCart();

    if (!reminders || reminders.length === 0) return null;

    return (
        <div className={styles.stack} role="region" aria-label="Cart reminders">
            {reminders.map((r) => (
                <div key={r.id} className={styles.toast}>
                    <div className={styles.icon} aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.row}>
                            <span className={styles.subject}>{r.subject}</span>
                            <span className={styles.time}>{r.at}</span>
                        </div>
                        <div className={styles.preview}>{r.preview}</div>
                    </div>
                    <button
                        className={styles.close}
                        onClick={() => dismissReminder(r.id)}
                        aria-label="Dismiss reminder"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CartReminders;
