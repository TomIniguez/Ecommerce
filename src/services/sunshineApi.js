/**
 * Sunshine Conversations API Service
 * Handles user metadata operations for Zendesk Messaging
 */

const SUNSHINE_APP_ID = import.meta.env.VITE_SUNSHINE_APP_ID;
const SUNSHINE_USERNAME = import.meta.env.VITE_SUNSHINE_USERNAME;
const SUNSHINE_PASSWORD = import.meta.env.VITE_SUNSHINE_PASSWORD;
const BASE_URL = 'https://api.smooch.io/v2';

/**
 * Create Basic Auth header
 */
const getAuthHeader = () => {
    const credentials = btoa(`${SUNSHINE_USERNAME}:${SUNSHINE_PASSWORD}`);
    return `Basic ${credentials}`;
};

/**
 * Get user data from Sunshine Conversations
 * @param {string} externalId - The external ID of the user (typically email)
 * @returns {Promise<Object>} User data
 */
export const getSunshineUser = async (externalId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/apps/${SUNSHINE_APP_ID}/users/${externalId}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': getAuthHeader(),
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to get user: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Error getting Sunshine user:', error);
        throw error;
    }
};

/**
 * Update user metadata in Sunshine Conversations
 * @param {string} externalId - The external ID of the user (typically email)
 * @param {Object} userData - User data to update
 * @param {Object} userData.profile - User profile data (givenName, surname, email, avatarUrl)
 * @param {Object} userData.metadata - Custom metadata (e.g., comitente, lang, tags)
 * @returns {Promise<Object>} Updated user data
 */
export const updateSunshineUser = async (externalId, userData) => {
    try {
        const response = await fetch(
            `${BASE_URL}/apps/${SUNSHINE_APP_ID}/users/${externalId}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': getAuthHeader(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to update user: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Error updating Sunshine user:', error);
        throw error;
    }
};

/**
 * Update user metadata (convenience method)
 * @param {string} externalId - The external ID of the user
 * @param {Object} metadata - Metadata object (e.g., { comitente: 'Banca PPI', lang: 'es-ar' })
 * @returns {Promise<Object>} Updated user data
 */
export const updateUserMetadata = async (externalId, metadata) => {
    return updateSunshineUser(externalId, { metadata });
};

/**
 * Update user profile (convenience method)
 * @param {string} externalId - The external ID of the user
 * @param {Object} profile - Profile object (givenName, surname, email, avatarUrl)
 * @returns {Promise<Object>} Updated user data
 */
export const updateUserProfile = async (externalId, profile) => {
    return updateSunshineUser(externalId, { profile });
};
