import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as jose from 'jose';
import { updateUserMetadata } from '../../services/sunshineApi';

const ZendeskWidget = () => {
    const { currentUser } = useAuth();

    // Zendesk credentials from environment variables
    const ZENDESK_KEY = import.meta.env.VITE_ZENDESK_KEY;
    const SECRET = import.meta.env.VITE_SHARED_SECRET;
    const KEY_ID = import.meta.env.VITE_KEY_ID;

    // Generate JWT token for Zendesk authentication (browser-compatible)
    const generateZendeskJWT = async (name, email) => {
        try {
            const payload = {
                scope: 'user',
                external_id: email,
                name: name,
                email: email,
                exp: Math.floor((new Date().getTime() + 300 * 1000) / 1000) // 5 minutes expiry
            };

            // Create secret key from string
            const secret = new TextEncoder().encode(SECRET);

            // Sign the JWT
            const token = await new jose.SignJWT(payload)
                .setProtectedHeader({ alg: 'HS256', typ: 'JWT', kid: KEY_ID })
                .sign(secret);

            return token;
        } catch (error) {
            console.error('Error generating JWT:', error);
            return null;
        }
    };

    // Update user metadata in Sunshine Conversations after login
    const updateUserData = async (externalId) => {
        try {
            // Update user metadata with comitente
            await updateUserMetadata(externalId, {
                comitente: 'Banca PPI',
                asesor: 'PPI Premium',
                lang: 'es-ar',
                tags: ''
            });
            console.log('User metadata updated successfully');
        } catch (error) {
            console.error('Failed to update user metadata:', error);
        }
    };

    useEffect(() => {
        // Only load Zendesk widget if user is logged in
        if (currentUser) {
            // Check if script is already loaded
            if (!document.getElementById('ze-snippet')) {
                const script = document.createElement('script');
                script.id = 'ze-snippet';
                script.src = `https://static.zdassets.com/ekr/snippet.js?key=${ZENDESK_KEY}`;
                script.async = true;

                script.onload = () => {
                    // Wait for zE to be available
                    const checkZE = setInterval(() => {
                        if (window.zE) {
                            clearInterval(checkZE);

                            // Use the Messaging SDK loginUser API
                            window.zE('messenger', 'loginUser', async function jwtCallback(callback) {
                                try {
                                    const jwtToken = await generateZendeskJWT(currentUser.name, currentUser.email);
                                    callback(jwtToken);
                                } catch (error) {
                                    console.error('Error in JWT callback:', error);
                                    callback(null);
                                }
                            }, function loginCallback(error) {
                                if (error) {
                                    console.error('Zendesk login failed:', error);
                                } else {
                                    // Show the messenger widget
                                    window.zE('messenger', 'show');

                                    // Update user metadata after successful login
                                    updateUserData(currentUser.email);
                                }
                            });
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
                // Script already loaded, just login the user
                const checkZE = setInterval(() => {
                    if (window.zE) {
                        clearInterval(checkZE);

                        window.zE('messenger', 'loginUser', async function jwtCallback(callback) {
                            const jwtToken = await generateZendeskJWT(currentUser.name, currentUser.email);
                            callback(jwtToken);
                        }, function loginCallback(error) {
                            if (error) {
                                console.error('Zendesk login failed:', error);
                            } else {
                                window.zE('messenger', 'show');

                                // Update user metadata after successful login
                                updateUserData(currentUser.email);
                            }
                        });
                    }
                }, 100);

                // Timeout after 5 seconds
                setTimeout(() => clearInterval(checkZE), 5000);
            }
        } else {
            // User logged out - logout from Zendesk and hide the widget
            if (window.zE) {
                try {
                    window.zE('messenger', 'logoutUser');
                    window.zE('messenger', 'hide');
                } catch (error) {
                    console.error('Error logging out from Zendesk:', error);
                }
            }
        }

        // Cleanup function
        return () => {
            if (window.zE && !currentUser) {
                try {
                    window.zE('messenger', 'hide');
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
