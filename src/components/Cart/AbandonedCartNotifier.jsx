import { useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { sendAbandonedCartNotification, isConfigured } from '../../services/notificationService';

const AbandonedCartNotifier = () => {
    const { showAbandonedModal, cart, showNotification } = useCart();
    const { currentUser } = useAuth();
    const sentRef = useRef(false);

    useEffect(() => {
        if (!showAbandonedModal || sentRef.current || cart.length === 0) return;
        sentRef.current = true;

        if (!isConfigured()) {
            showNotification('Notification API not configured.', 'error');
            return;
        }

        sendAbandonedCartNotification({ user: currentUser, cart }).then(result => {
            if (result.success) {
                showNotification('WhatsApp recovery sent!', 'success');
            } else {
                showNotification(`Notification failed: ${result.error}`, 'error');
            }
        });
    }, [showAbandonedModal, cart, currentUser, showNotification]);

    useEffect(() => {
        if (cart.length === 0) sentRef.current = false;
    }, [cart.length]);

    return null;
};

export default AbandonedCartNotifier;
