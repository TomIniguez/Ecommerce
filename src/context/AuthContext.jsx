import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const PASSWORD_SALT = 'shopily_demo_salt_v1';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEMO_USER = {
    name: 'Demo User',
    email: 'demo@shopily.com',
    // Plain password is 'demo1234'. Hashed at seed time.
    plainPassword: 'demo1234'
};

const hashPassword = async (password) => {
    const data = new TextEncoder().encode(password + PASSWORD_SALT);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
};

const seedDemoUser = async () => {
    const users = JSON.parse(localStorage.getItem('shopily_users') || '[]');
    if (!users.some(u => u.email === DEMO_USER.email)) {
        users.push({
            name: DEMO_USER.name,
            email: DEMO_USER.email,
            passwordHash: await hashPassword(DEMO_USER.plainPassword)
        });
        localStorage.setItem('shopily_users', JSON.stringify(users));
    }
};
//random comment

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        seedDemoUser();
        const savedUser = localStorage.getItem('shopily_current_user');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email, password) => {
        const users = JSON.parse(localStorage.getItem('shopily_users') || '[]');
        const passwordHash = await hashPassword(password);
        const user = users.find(u => u.email === email && u.passwordHash === passwordHash);

        if (user) {
            const userData = { name: user.name, email: user.email };
            setCurrentUser(userData);
            localStorage.setItem('shopily_current_user', JSON.stringify(userData));
            setShowLoginModal(false);
            return { success: true, message: `Welcome back, ${user.name}!` };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const register = async (name, email, password) => {
        if (!EMAIL_REGEX.test(email)) {
            return { success: false, message: 'Please enter a valid email address' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        const users = JSON.parse(localStorage.getItem('shopily_users') || '[]');
        if (users.some(u => u.email === email)) {
            return { success: false, message: 'An account with this email already exists' };
        }

        const passwordHash = await hashPassword(password);
        users.push({ name, email, passwordHash });
        localStorage.setItem('shopily_users', JSON.stringify(users));

        const userData = { name, email };
        setCurrentUser(userData);
        localStorage.setItem('shopily_current_user', JSON.stringify(userData));
        setShowRegisterModal(false);
        return { success: true, message: `Welcome to Shopily, ${name}!` };
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('shopily_current_user');
        return { success: true, message: 'You have been logged out' };
    };

    const openLoginModal = () => {
        setShowLoginModal(true);
        setShowRegisterModal(false);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    const openRegisterModal = () => {
        setShowRegisterModal(true);
        setShowLoginModal(false);
    };

    const closeRegisterModal = () => {
        setShowRegisterModal(false);
    };

    const switchToRegister = () => {
        setShowLoginModal(false);
        setTimeout(() => setShowRegisterModal(true), 200);
    };

    const switchToLogin = () => {
        setShowRegisterModal(false);
        setTimeout(() => setShowLoginModal(true), 200);
    };

    const getUserInitials = () => {
        if (!currentUser) return '';
        return currentUser.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const value = {
        currentUser,
        login,
        register,
        logout,
        showLoginModal,
        showRegisterModal,
        openLoginModal,
        closeLoginModal,
        openRegisterModal,
        closeRegisterModal,
        switchToRegister,
        switchToLogin,
        getUserInitials
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
