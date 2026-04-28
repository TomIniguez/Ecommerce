const ENDPOINT = 'https://prdwproxy.witbor.com/sunshine/messages/single';

const TOKEN = import.meta.env.VITE_PRDW_TOKEN;
const LINE_ID = import.meta.env.VITE_WA_LINE_ID;
const TEMPLATE_ID = import.meta.env.VITE_WA_TEMPLATE_ID;
const DESTINATION_ID = import.meta.env.VITE_WA_DESTINATION_ID;
const USERNAME = import.meta.env.VITE_WA_USERNAME;
const RETURN_URL = import.meta.env.VITE_RETURN_URL
    || (typeof window !== 'undefined' ? window.location.origin : 'https://shopily.com');

export const isConfigured = () =>
    Boolean(TOKEN && LINE_ID && TEMPLATE_ID && DESTINATION_ID && USERNAME);

export const sendAbandonedCartNotification = async ({ user, cart }) => {
    if (!isConfigured()) {
        return { success: false, error: 'Missing VITE_PRDW_* / VITE_WA_* env vars.' };
    }
    if (!cart || cart.length === 0) {
        return { success: false, error: 'Cart is empty.' };
    }

    const customerName = 'Ivette';
    const productNames = [...new Set(cart.map(i => i.name))].join(', ');
    const linkToCart = 'https://tominiguez.github.io/Ecommerce/';

    const payload = {
        lineId: LINE_ID,
        templateId: TEMPLATE_ID,
        message: {
            id: 1,
            to: DESTINATION_ID,
            customerName: '',
            vars: [
                { value: customerName, key: 'customer_name', location: 'BODY' },
                { value: productNames, key: 'product_name', location: 'BODY' },
                { value: linkToCart, key: 'link_to_cart', location: 'BODY' },
            ],
            status: 'PENDING',
        },
        schedule: null,
        statisticTicketSettings: {
            requester: {
                name: 'Witalker by Witbor',
                email: 'witalker@bywitbor.com',
            },
            settings: {
                agentAsRequester: false,
                ticketStatus: 'closed',
            },
            locale: 'es',
        },
        username: USERNAME,
    };

    try {
        const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`,
                appId: '641c860da4cefd0115ce6a87',
                key: 'app_6892125605d49bf201baf4f3:IH_ivv6TqD-BxYCZUvNf4MQVNQt4i6FwTaOB8mN1vr8PW4JJ_cTcwRvrb7tUqs-mMJ_Jgapo-Q4d6zljAStkNA',
                subdomain: 'https://shopily.zendesk.com',
                'zendesk-api-user': 'tomas.iniguez@witbor.com',
                'zendesk-api-key': 'pcBWNLpYhJuwIZMluNP83SiJ1X59da7XTXdYhd5d',
            },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const text = await res.text();
            return { success: false, error: `${res.status}: ${text}` };
        }
        return { success: true };
    } catch (err) {
        return { success: false, error: err?.message || 'Network error' };
    }
};
