import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ZENDESK_KEY = import.meta.env.VITE_ZENDESK_KEY;

const ZendeskWidget = () => {
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser || !ZENDESK_KEY) {
            if (window.zE) {
                try {
                    window.zE('messenger', 'hide');
                } catch (_) {}
            }
            return;
        }

        // Only load widget if we have a key
        if (!document.getElementById('ze-snippet')) {
            const script = document.createElement('script');
            script.id = 'ze-snippet';
            script.src = `https://static.zdassets.com/ekr/snippet.js?key=${ZENDESK_KEY}`;
            script.async = true;
            script.onerror = () => console.error('Failed to load Zendesk script');
            document.body.appendChild(script);
        }

        // Poll for zE and show/open when ready
        const checkZE = setInterval(() => {
            if (window.zE) {
                clearInterval(checkZE);
                try {
                    window.zE('messenger', 'show');
                    window.zE('messenger', 'open');
                } catch (err) {
                    console.error('Failed to show Zendesk messenger:', err);
                }
            }
        }, 100);

        return () => clearInterval(checkZE);
    }, [currentUser]);

    return null;
};

export default ZendeskWidget;
