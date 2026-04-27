const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || 'Shopily';

const formatPrice = (n) => `$${n.toFixed(2)}`;

const buildItemsHtml = (items) => items
    .map(item => `
        <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eee;color:#333;">${item.name}</td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;color:#1E88E5;text-align:right;font-weight:600;">${formatPrice(item.price * (item.quantity || 1))}</td>
        </tr>
    `).join('');

const buildItemsText = (items) => items
    .map(item => `• ${item.name}${item.quantity > 1 ? ` (x${item.quantity})` : ''} — ${formatPrice(item.price * (item.quantity || 1))}`)
    .join('\n');

const groupCart = (cart) => {
    const map = new Map();
    for (const item of cart) {
        const existing = map.get(item.id);
        if (existing) existing.quantity += 1;
        else map.set(item.id, { ...item, quantity: 1 });
    }
    return Array.from(map.values());
};

export const isEmailConfigured = () =>
    Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export const sendAbandonedCartEmail = async ({ user, cart, discount, returnUrl }) => {
    if (!isEmailConfigured()) {
        return { success: false, error: 'EmailJS is not configured. Check .env VITE_EMAILJS_* vars.' };
    }
    if (!user?.email) {
        return { success: false, error: 'No recipient email available.' };
    }
    if (!cart || cart.length === 0) {
        return { success: false, error: 'Cart is empty.' };
    }

    const grouped = groupCart(cart);
    const subtotal = grouped.reduce((s, i) => s + i.price * i.quantity, 0);
    const offerText = discount
        ? `${discount.percent}% off with code ${discount.code}`
        : 'Free Shipping';

    const templateParams = {
        to_name: user.name || 'there',
        to_email: user.email,
        email: user.email,
        brand_name: BRAND_NAME,
        subject: 'Your cart has FOMO... (and a gift inside! 🎁)',
        offer: offerText,
        discount_code: discount?.code || '',
        discount_percent: discount?.percent || '',
        items_html: buildItemsHtml(grouped),
        items_text: buildItemsText(grouped),
        cart_total: formatPrice(subtotal),
        return_url: returnUrl || (typeof window !== 'undefined' ? window.location.href : '#'),
    };

    try {
        const response = await fetch(EMAILJS_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: SERVICE_ID,
                template_id: TEMPLATE_ID,
                user_id: PUBLIC_KEY,
                template_params: templateParams,
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            return { success: false, error: `EmailJS ${response.status}: ${text}` };
        }
        return { success: true };
    } catch (err) {
        return { success: false, error: err?.message || 'Network error' };
    }
};
