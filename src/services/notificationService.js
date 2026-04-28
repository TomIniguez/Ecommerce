const ENDPOINT = 'https://prdwproxy.witbor.com/sunshine/notification';

const TOKEN = import.meta.env.VITE_PRDW_TOKEN;
const INTEGRATION_ID = import.meta.env.VITE_WA_INTEGRATION_ID;
const DESTINATION_ID = import.meta.env.VITE_WA_DESTINATION_ID;
const TEMPLATE_NAME = import.meta.env.VITE_WA_TEMPLATE_NAME || 'abandoned_cart';
const RETURN_URL = import.meta.env.VITE_RETURN_URL
    || (typeof window !== 'undefined' ? window.location.origin : 'https://shopily.com');

export const isConfigured = () =>
    Boolean(TOKEN && INTEGRATION_ID && DESTINATION_ID);

export const sendAbandonedCartNotification = async ({ user, cart }) => {
    if (!isConfigured()) {
        return { success: false, error: 'Missing VITE_PRDW_* / VITE_WA_* env vars.' };
    }
    if (!cart || cart.length === 0) {
        return { success: false, error: 'Cart is empty.' };
    }

    const customerName = 'Ivette';
    const productNames = [...new Set(cart.map(i => i.name))].join(', ');
    const linkToCart = RETURN_URL;

    const payload = {
        destination: { integrationId: INTEGRATION_ID, destinationId: DESTINATION_ID },
        author: { role: 'appMaker' },
        messageSchema: 'whatsapp',
        message: {
            type: 'template',
            template: {
                name: TEMPLATE_NAME,
                language: { policy: 'deterministic', code: 'en' },
                components: [{
                    type: 'body',
                    parameters: [
                        { type: 'text', text: customerName },
                        { type: 'text', text: productNames },
                        { type: 'text', text: linkToCart },
                    ],
                }],
            },
        },
    };

    try {
        const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`,
                appId: "641c860da4cefd0115ce6a87",
                key: "app_6892125605d49bf201baf4f3:IH_ivv6TqD-BxYCZUvNf4MQVNQt4i6FwTaOB8mN1vr8PW4JJ_cTcwRvrb7tUqs-mMJ_Jgapo-Q4d6zljAStkNA",
                subdomain:"https://shopily.zendesk.com/"

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
