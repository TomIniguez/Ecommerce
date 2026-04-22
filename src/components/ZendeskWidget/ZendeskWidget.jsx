import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateUserMetadata } from '../../services/sunshineApi';

const ZENDESK_KEY = import.meta.env.VITE_ZENDESK_KEY;

const showMessenger = () => {
    if (!window.zE) return;
    try {
        window.zE('messenger', 'show');
        window.zE('messenger', 'open');
    } catch (err) {
        console.error('Zendesk show/open failed:', err);
    }
};

const waitForZE = (onReady, timeoutMs = 10000) => {
    const start = Date.now();
    const interval = setInterval(() => {
        if (window.zE) {
            clearInterval(interval);
            onReady();
        } else if (Date.now() - start > timeoutMs) {
            clearInterval(interval);
            console.error('Zendesk zE did not become available within timeout');
        }
    }, 100);
};

const ZendeskWidget = () => {
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) {
            if (window.zE) {
                try { window.zE('messenger', 'hide'); } catch (_) {}
            }
            return;
        }

        const onReady = () => {
            showMessenger();
            updateUserMetadata(currentUser.email, {
                comitente: 'Banca PPI',
                asesor: 'PPI Premium',
                lang: 'es-ar',
                name: currentUser.name,
                email: currentUser.email
            }).catch(err => console.error('Failed to update user metadata:', err));
        };

        if (document.getElementById('ze-snippet')) {
            waitForZE(onReady);
            return;
        }

        const script = document.createElement('script');
        script.id = 'ze-snippet';
        script.src = `https://static.zdassets.com/ekr/snippet.js?key=${ZENDESK_KEY}`;
        script.async = true;
        script.onload = () => waitForZE(onReady);
        script.onerror = () => console.error('Failed to load Zendesk script');
        document.body.appendChild(script);
    }, [currentUser]);

    return null;
};

export default ZendeskWidget;
