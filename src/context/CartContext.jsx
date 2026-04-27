import { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'shopily_cart_v1';
const ABANDON_STORAGE_KEY = 'shopily_cart_abandoned_v1';
const DISCOUNT_STORAGE_KEY = 'shopily_cart_discount_v1';

// Demo-friendly thresholds (short so the abandoned-cart flow is easy to see)
const INACTIVITY_MS = 30 * 1000;        // 30s without cart activity → consider abandoned
const ABANDON_AFTER_LEAVE_MS = 2 * 1000; // 2s after exit-intent without return
const REMINDER_DELAYS_MS = [60 * 1000, 3 * 60 * 1000]; // 1min, 3min "email-like" reminders

const DISCOUNT = { code: 'COMEBACK10', percent: 10 };

const loadCart = () => {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(loadCart);
    const [notification, setNotification] = useState(null);
    const [showAbandonedModal, setShowAbandonedModal] = useState(false);
    const [appliedDiscount, setAppliedDiscount] = useState(() => {
        try { return JSON.parse(localStorage.getItem(DISCOUNT_STORAGE_KEY) || 'null'); }
        catch { return null; }
    });
    const [reminders, setReminders] = useState([]); // simulated "email" reminders queue

    const inactivityTimer = useRef(null);
    const exitIntentTimer = useRef(null);
    const reminderTimers = useRef([]);
    const hasShownThisSession = useRef(false);

    // Persist cart
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const showNotification = useCallback((message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    }, []);

    const triggerAbandoned = useCallback((reason) => {
        if (hasShownThisSession.current) return;
        if (cart.length === 0) return;
        hasShownThisSession.current = true;
        localStorage.setItem(ABANDON_STORAGE_KEY, JSON.stringify({ at: Date.now(), reason }));
        setShowAbandonedModal(true);
    }, [cart.length]);

    const scheduleReminders = useCallback(() => {
        reminderTimers.current.forEach(clearTimeout);
        reminderTimers.current = REMINDER_DELAYS_MS.map((delay, idx) =>
            setTimeout(() => {
                setReminders(prev => [...prev, {
                    id: Date.now() + idx,
                    subject: idx === 0 ? 'You left something behind!' : 'Last chance — your cart is waiting',
                    preview: idx === 0
                        ? `Your items are still in your cart. Use code ${DISCOUNT.code} for ${DISCOUNT.percent}% off.`
                        : `Don't miss out — checkout now and save ${DISCOUNT.percent}%.`,
                    at: new Date().toLocaleTimeString(),
                }]);
            }, delay)
        );
    }, []);

    // Reset inactivity timer whenever cart changes (and there are items)
    const resetInactivity = useCallback(() => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        if (cart.length === 0) return;
        inactivityTimer.current = setTimeout(() => triggerAbandoned('inactivity'), INACTIVITY_MS);
    }, [cart.length, triggerAbandoned]);

    useEffect(() => {
        resetInactivity();
        return () => { if (inactivityTimer.current) clearTimeout(inactivityTimer.current); };
    }, [cart, resetInactivity]);

    // Exit-intent detection: pointer leaves through the top of the viewport
    useEffect(() => {
        const handleMouseLeave = (e) => {
            if (e.clientY > 0) return; // only top-edge exit
            if (cart.length === 0 || hasShownThisSession.current) return;
            if (exitIntentTimer.current) clearTimeout(exitIntentTimer.current);
            exitIntentTimer.current = setTimeout(
                () => triggerAbandoned('exit-intent'),
                ABANDON_AFTER_LEAVE_MS
            );
        };
        const handleMouseEnter = () => {
            if (exitIntentTimer.current) clearTimeout(exitIntentTimer.current);
        };
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            if (exitIntentTimer.current) clearTimeout(exitIntentTimer.current);
        };
    }, [cart.length, triggerAbandoned]);

    // On mount: if a previous session was marked abandoned and cart still has items, welcome back
    useEffect(() => {
        const raw = localStorage.getItem(ABANDON_STORAGE_KEY);
        if (raw && cart.length > 0) {
            showNotification('Welcome back! Your cart is right where you left it.', 'success');
            localStorage.removeItem(ABANDON_STORAGE_KEY);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Cleanup reminder timers on unmount
    useEffect(() => () => reminderTimers.current.forEach(clearTimeout), []);

    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
        showNotification(`${product.name} added to cart!`, 'success');
        hasShownThisSession.current = false; // user is engaged again
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
        showNotification('Item removed from cart', 'success');
    };

    const incrementItem = (productId) => {
        setCart(prevCart => {
            const match = prevCart.find(item => item.id === productId);
            return match ? [...prevCart, match] : prevCart;
        });
    };

    const decrementItem = (productId) => {
        setCart(prevCart => {
            const idx = prevCart.findIndex(item => item.id === productId);
            if (idx === -1) return prevCart;
            const next = [...prevCart];
            next.splice(idx, 1);
            return next;
        });
    };

    const clearCart = () => {
        setCart([]);
        setAppliedDiscount(null);
        localStorage.removeItem(DISCOUNT_STORAGE_KEY);
        localStorage.removeItem(ABANDON_STORAGE_KEY);
        reminderTimers.current.forEach(clearTimeout);
        setReminders([]);
        showNotification('Cart cleared!', 'success');
    };

    const getCartSubtotal = () => cart.reduce((total, item) => total + item.price, 0);

    const getCartTotal = () => {
        const subtotal = getCartSubtotal();
        if (!appliedDiscount) return subtotal;
        return subtotal * (1 - appliedDiscount.percent / 100);
    };

    const getCartCount = () => cart.length;

    const recoverCart = () => {
        setAppliedDiscount(DISCOUNT);
        localStorage.setItem(DISCOUNT_STORAGE_KEY, JSON.stringify(DISCOUNT));
        setShowAbandonedModal(false);
        showNotification(`Discount ${DISCOUNT.code} applied — ${DISCOUNT.percent}% off!`, 'success');
        scheduleReminders();
    };

    const dismissAbandonedModal = () => {
        setShowAbandonedModal(false);
        scheduleReminders(); // still send the simulated reminders
    };

    const dismissReminder = (id) => {
        setReminders(prev => prev.filter(r => r.id !== id));
    };

    // Manual trigger for demo/testing
    const simulateAbandon = () => {
        hasShownThisSession.current = false;
        triggerAbandoned('manual');
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
        clearCart,
        getCartTotal,
        getCartSubtotal,
        getCartCount,
        notification,
        showNotification,
        // abandoned-cart API
        showAbandonedModal,
        appliedDiscount,
        discount: DISCOUNT,
        recoverCart,
        dismissAbandonedModal,
        simulateAbandon,
        reminders,
        dismissReminder,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
