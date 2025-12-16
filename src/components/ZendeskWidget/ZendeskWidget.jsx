import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as jose from 'jose';

const ZendeskWidget = () => {
    const { currentUser } = useAuth();

    // Hardcoded Zendesk credentials for demo (replace with your actual values)
    const ZENDESK_KEY = '319875b5-1e67-4292-af08-1d517118a671';
    const SECRET = 'your_shared_secret_here'; // Replace with your Zendesk shared secret from Admin Center
    const KEY_ID = 'your_key_id_here'; // Replace with your Zendesk key ID from Admin Center

    // Generate JWT token for Zendesk authentication (browser-compatible)
    const generateZendeskJWT = async (name, email) => {
        try {
            const payload = {
                name: name,
                email: email,
                external_id: email,
                exp: Math.floor((new Date().getTime() + 300 * 1000) / 1000), // 5 minutes expiry
                scope: 'user',
                comitente: '123456'
            };

            // Create secret key from string
            const secret = new TextEncoder().encode(SECRET);

            // Sign the JWT
            const token = await new jose.SignJWT(payload)
                .setProtectedHeader({ alg: 'HS256', typ: 'JWT', kid: KEY_ID })
                .sign(secret);

            console.log('Generated JWT token for:', { name, email });
            return token;
        } catch (error) {
            console.error('Error generating JWT:', error);
            return null;
        }
    };

    useEffect(() => {
        // Only load Zendesk widget if user is logged in
        if (currentUser) {
            console.log('User logged in, loading Zendesk widget for:', currentUser.name);

            // Check if script is already loaded
            if (!document.getElementById('ze-snippet')) {
                console.log('Loading Zendesk script...');
                const script = document.createElement('script');
                script.id = 'ze-snippet';
                script.src = 'https://static.zdassets.com/ekr/snippet.js?key=319875b5-1e67-4292-af08-1d517118a671';
                script.async = true;

                script.onload = () => {
                    console.log('Zendesk script loaded successfully');
                    // Wait for zE to be available
                    const checkZE = setInterval(async () => {
                        if (window.zE) {
                            clearInterval(checkZE);
                            console.log('Zendesk widget ready, identifying user...');
                            try {
                                // Generate JWT token (async)
                                const jwtToken = await generateZendeskJWT(currentUser.name, currentUser.email);

                                // Identify user with Zendesk
                                window.zE('webWidget', 'identify', {
                                    name: currentUser.name,
                                    email: currentUser.email
                                });

                                // Authenticate with JWT (uncomment if JWT auth is enabled in Zendesk)
                                // if (jwtToken) {
                                //     window.zE('webWidget', 'authenticate', {
                                //         jwt: jwtToken
                                //     });
                                // }

                                // Show the widget
                                window.zE('webWidget', 'show');

                                console.log('Zendesk widget shown and user identified');
                                console.log('User credentials sent to Zendesk:', {
                                    name: currentUser.name,
                                    email: currentUser.email,
                                    external_id: currentUser.email,
                                    jwt_generated: !!jwtToken
                                });

                                // Debug: Check widget state
                                setTimeout(() => {
                                    window.zE('webWidget:get', 'display', (display) => {
                                        console.log('Widget display state:', display);
                                    });

                                    // Check if widget iframe exists
                                    const iframe = document.querySelector('iframe[id*="webWidget"]');
                                    console.log('Widget iframe found:', !!iframe);
                                    if (iframe) {
                                        console.log('Widget iframe style:', iframe.style.cssText);
                                    }
                                }, 1000);
                            } catch (error) {
                                console.error('Error configuring Zendesk:', error);
                            }
                        }
                    }, 100);

                    // Timeout after 10 seconds
                    setTimeout(() => clearInterval(checkZE), 10000);
                };

                script.onerror = () => {
                    console.error('Failed to load Zendesk script');
                };

                document.body.appendChild(script);
            } else {
                console.log('Zendesk script already loaded, showing widget...');
                // Script already loaded, just show the widget
                const checkZE = setInterval(() => {
                    if (window.zE) {
                        clearInterval(checkZE);
                        try {
                            window.zE('webWidget', 'show');
                            window.zE('webWidget', 'identify', {
                                name: currentUser.name,
                                email: currentUser.email
                            });
                            console.log('Zendesk widget shown');
                        } catch (error) {
                            console.error('Error showing Zendesk widget:', error);
                        }
                    }
                }, 100);

                // Timeout after 5 seconds
                setTimeout(() => clearInterval(checkZE), 5000);
            }
        } else {
            console.log('User logged out, hiding Zendesk widget');
            // User logged out - hide the widget
            if (window.zE) {
                try {
                    window.zE('webWidget', 'hide');
                } catch (error) {
                    console.error('Error hiding Zendesk widget:', error);
                }
            }
        }

        // Cleanup function
        return () => {
            if (window.zE && !currentUser) {
                try {
                    window.zE('webWidget', 'hide');
                } catch (error) {
                    // Ignore errors during cleanup
                }
            }
        };
    }, [currentUser]);

    // This component doesn't render anything visible
    return null;
};

export default ZendeskWidget;

