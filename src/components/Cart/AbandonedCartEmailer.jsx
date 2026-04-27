import { useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { sendAbandonedCartEmail, isEmailConfigured } from '../../services/emailService';

const AbandonedCartEmailer = () => {
    const { showAbandonedModal, cart, discount, appliedDiscount, reminders, showNotification } = useCart();
    const { currentUser } = useAuth();

    const sentInitialRef = useRef(false);
    const lastReminderCountRef = useRef(0);

    // Fire once when the abandoned-cart modal first opens
    useEffect(() => {
        if (!showAbandonedModal || sentInitialRef.current) return;
        if (!currentUser?.email || cart.length === 0) return;

        sentInitialRef.current = true;

        if (!isEmailConfigured()) {
            showNotification('Email not configured — skipping send.', 'error');
            return;
        }

        sendAbandonedCartEmail({
            user: currentUser,
            cart,
            discount: appliedDiscount || discount,
            returnUrl: window.location.href,
        }).then(result => {
            if (result.success) {
                showNotification(`Recovery email sent to ${currentUser.email}`, 'success');
            } else {
                showNotification(`Email failed: ${result.error}`, 'error');
            }
        });
    }, [showAbandonedModal, currentUser, cart, discount, appliedDiscount, showNotification]);

    // Fire again each time a simulated reminder is queued
    useEffect(() => {
        if (reminders.length <= lastReminderCountRef.current) {
            lastReminderCountRef.current = reminders.length;
            return;
        }
        lastReminderCountRef.current = reminders.length;

        if (!currentUser?.email || cart.length === 0 || !isEmailConfigured()) return;

        sendAbandonedCartEmail({
            user: currentUser,
            cart,
            discount: appliedDiscount || discount,
            returnUrl: window.location.href,
        }).then(result => {
            if (result.success) {
                showNotification(`Reminder email sent to ${currentUser.email}`, 'success');
            }
        });
    }, [reminders.length, currentUser, cart, discount, appliedDiscount, showNotification]);

    // Reset send guard when cart empties (user checked out / cleared)
    useEffect(() => {
        if (cart.length === 0) sentInitialRef.current = false;
    }, [cart.length]);

    return null;
};

export default AbandonedCartEmailer;
